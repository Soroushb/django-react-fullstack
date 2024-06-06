import  { useState, useEffect } from "react";
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
    const [highlightDates, setHighlightDates] = useState([]);

    const fetchNotes = async () => {
        try {
            const res = await api.get("/api/notes/");
            const data = res.data;
            setNotes(data);
            const highlightDates = data.map((note) => new Date(note.created_at).toISOString().split('T')[0]);
            setHighlightDates(highlightDates);
        } catch (error) {
            navigate("login");
        }
    };

    useEffect(() => {
         fetchNotes();
    }, [navigate]);

    useEffect(() => {
        const calender = flatpickr("#datepicker", {
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateString) {
                setDate(dateString);
            },
            onDayCreate: (dObj, dStr, fp, dayElem) => {
                const dateStr = dayElem.dateObj.toISOString().split('T')[0];

                if (highlightDates.includes(dateStr)) {
                    dayElem.classList.add('highlight');
                }
            }
        });

        calender.open();
    }, [highlightDates]);

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

    const createNote = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("/api/notes/", { content, title });
            if (res.status === 201) alert("Note Created.");
            else alert("Failed to make the note.");
            fetchNotes();
        } catch (error) {
            alert(error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const res = await api.delete(`/api/notes/delete/${id}`);
            if (res.status === 204) alert("Note was deleted.");
            else alert("Failed to delete the note.");
            fetchNotes();
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className="container mx-auto p-4 font-primary">
            <div className="flex flex-col lg:flex-row justify-between">
                <div className="flex flex-col items-center lg:w-1/2">
                    <h1 className="text-white font-bold text-2xl m-4 font-primary">View Your Notes</h1>
                    <div className="flex items-center mb-4 w-full">
                        <input type="text" id="datepicker" className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-full" placeholder="Select Date" />
                        <style>
                            {`
                                .highlight {
                                    background-color: #FFD700 !important;
                                    color: #000 !important;
                                }
                            `}
                        </style>
                    </div>
                    <div className="w-full">
                        {newNotes?.map((note) => (
                            <Note note={note} onDelete={deleteNote} key={note.id} />
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center lg:w-1/2 mt-8 lg:mt-0">
                    <h2 className="text-white font-bold text-2xl font-primary mt-4 mb-4">Create a Note</h2>
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
                            <input type="submit" value="Submit" className="px-4 py-2 font-bold bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Home;
