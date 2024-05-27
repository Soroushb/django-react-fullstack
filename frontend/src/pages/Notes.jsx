import React, { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
import Note from "../components/Note";
import { useNavigate } from "react-router-dom";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const Home = () => {
    const navigate = useNavigate();

    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [newNotes, setNewNotes] = useState([]);

    useEffect(() => {
        getNotes();
        const calender = flatpickr("#datepicker", {
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateString) {
                setDate(dateString);
            }
        });
        calender.open();
    }, []);

    useEffect(() => {
        if (date === "") return;

        const selectedDate = new Date(date);
        const formattedDate = selectedDate.toISOString().split('T')[0];

        const dateNotes = notes.filter(note => {
            const noteDate = new Date(note.created_at).toISOString().split('T')[0];
            return noteDate === formattedDate;
        });

        setNewNotes(dateNotes);
    }, [date, notes]);

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {
                setNotes(data);
                console.log(data);
            })
            .catch(() => navigate("login"));
    };

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}`)
            .then((res) => {
                if (res.status === 204) alert("Note was deleted.");
                else alert("Failed to delete the note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("/api/notes/", { content, title })
            .then((res) => {
                if (res.status === 201) alert("Note Created.");
                else alert("Failed to make the note.");
                getNotes();
            })
            .catch((error) => alert(error));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col items-center lg:w-1/2">
                    <h1 className="text-white font-bold text-xl m-4">View Your Notes</h1>
                    <div className="flex items-center mb-4 w-full">
                        <input type="text" id="datepicker" className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full" placeholder="Select Date" />
                    </div>
                    <div className="w-full">
                        {newNotes?.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center lg:w-1/2 mt-8 lg:mt-0">
                    <h2 className="text-white font-bold text-xl mb-4">Create a Note</h2>
                    <form onSubmit={createNote} className="w-full">
                        <div className="mb-4">
                            <label htmlFor="title" className="block mb-1">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                required
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="content" className="block mb-1">Content:</label>
                            <textarea
                                id="content"
                                name="content"
                                required
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full"
                            ></textarea>
                        </div>
                        <div className="text-center">
                            <input type="submit" value="Submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
