import React from "react";
import "../styles/Note.css"
import api from "../api"
import { useNavigate } from "react-router-dom"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "../constants"
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator"

function Note({ note, onDelete }) {
    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")

    const navigate = useNavigate()

    return (


        <>
        <div>
            <button onClick={() => {
                localStorage.removeItem(ACCESS_TOKEN);
                localStorage.removeItem(REFRESH_TOKEN);
                navigate("/login")}}>Logout</button>
        </div>
        <div className="note-container">
            <p className="note-title">{note.title}</p>
            <p className="note-content">{note.content}</p>
            <p className="note-date">{formattedDate}</p>
            <button className="delete-button" onClick={() => onDelete(note.id)}>
                Delete
            </button>
        </div>
        </>
        
    );
}

export default Note