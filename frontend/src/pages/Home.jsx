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
    const [newNotes, setNewNotes] = useState([])

    useEffect(() => {
        getNotes();
        const calender = flatpickr("#datepicker", {
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateString) {
              setDate(dateString)
            
          }
        });
        calender.open()
    }, []); 


    useEffect(() => {
      if (date === "") return; 
  
      const selectedDate = new Date(date);
      const formattedDate = selectedDate.toISOString().split('T')[0];
  
      const dateNotes = notes.filter(note => {
          const noteDate = new Date(note.created_at).toISOString().split('T')[0];
          return noteDate === formattedDate;
      });

      setNewNotes(dateNotes)
      
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
        <div className="flex container p-20 w-full justify-between">

            <div>
            <div className="flex flex-col container p-10 items-center justify-center">
            <h1 className="text-white text-bold text-xl m-4">View Your Notes</h1>
            <div className="flex items-center">
                <input  type="text" id="datepicker" className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Select Date" />
            </div>
            <div className="p-4">
              
              {newNotes?.map((note) => (
                
                  <Note note={note} onDelete={deleteNote} key={note.id} />
              ))}
            </div>
            </div>
            </div>
            <div>

           
            <h2 className="text-white m-4 text-xl">Create a Note</h2>
            <form onSubmit={createNote}>
                <label htmlFor="title">Title:</label>
                <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
                <label htmlFor="content">Content:</label>
                <br />
                <textarea
                    id="content"
                    name="content"
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>

            </div>
            
            
            
    
    );
};

export default Home;
