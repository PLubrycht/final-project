import { useState, useEffect } from "react";
import { useNotes } from "../hooks/useNotes";
import { NoteItem } from "./NoteItem";
import "./NotesApp.css";

export const NotesApp = () => {
  const { notes, getNotes, addNote, deleteNote } = useNotes();
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    await addNote(newNote);
    setNewNote("");
  };

  return (
    <div className="app-container">
      <h1>Moje Notatki 📝</h1>
      <div className="input-container">
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Napisz nową notatkę"
        />
        <button onClick={handleAddNote}>Dodaj</button>
      </div>
      <ul className="notes-list">
        {notes.map((note, index) => (
          <NoteItem
            key={index}
            content={note.content}
            timestamp={note.timestamp}
            onDelete={() => deleteNote(index)}
          />
        ))}
      </ul>
    </div>
  );
};
