import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import { FaPenAlt } from "react-icons/fa";


function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  const navigate = useNavigate();

  return (
    <div className="note-container">
      
      <div className="max-w-xs bg-slate-900 shadow-md rounded-md p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg flex font-bold text-white"> <FaPenAlt className=" m-2"/> {note.title}</h2>
          
        </div>
        <p className="text-sm text-gray-400 mb-4">{note.content}</p>
        <div className="flex justify-between">
        <p className="text-xs text-gray-300">{formattedDate}</p>
        <button
            onClick={() => onDelete(note.id)}
            className="text-xs font-semibold text-red-400 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      
      </div>
    </div>
  );
}

export default Note;