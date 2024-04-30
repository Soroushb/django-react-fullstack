import React from "react";
import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");
  const navigate = useNavigate();

  return (
    <div className="note-container">
      <div className="max-w-xs bg-yellow-100 border border-yellow-300 shadow-md rounded-md p-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-bold text-gray-800">{note.title}</h2>
          <button
            onClick={() => onDelete(note.id)}
            className="text-xs font-semibold text-red-700 hover:text-red-900"
          >
            Delete
          </button>
        </div>
        <p className="text-sm text-gray-700 mb-4">{note.content}</p>
        <p className="text-xs text-gray-500">{formattedDate}</p>
      </div>
    </div>
  );
}

export default Note;