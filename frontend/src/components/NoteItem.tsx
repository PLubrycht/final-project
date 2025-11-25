import React from "react";
import "./NoteItem.css";

interface NoteItemProps {
  content: string;
  timestamp: number;
  onDelete: () => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  content,
  timestamp,
  onDelete,
}) => {
  return (
    <li className="note-item">
      <div>
        <p className="note-content">{content}</p>
        <span className="note-timestamp">
          {new Date(timestamp * 1000).toLocaleString()}
        </span>
      </div>
      <button className="delete-btn" onClick={onDelete}>
        Usuń
      </button>
    </li>
  );
};
