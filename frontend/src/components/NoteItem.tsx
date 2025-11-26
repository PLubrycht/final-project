import React from "react";
import "./NoteItem.css";

interface NoteItemProps {
  content: string;
  timestamp: bigint | number; // ważne → dopuszczamy BigInt
  onDelete: () => void;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  content,
  timestamp,
  onDelete,
}) => {
  // Konwersja BigInt → number
  const ts = Number(timestamp);

  return (
    <li className="note-item">
      <div>
        <p className="note-content">{content}</p>
        <span className="note-timestamp">
          {new Date(ts * 1000).toLocaleString()}
        </span>
      </div>
      <button className="delete-btn" onClick={onDelete}>
        Usuń
      </button>
    </li>
  );
};
