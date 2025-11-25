import { render, screen, fireEvent } from "@testing-library/react";
import { NotesApp } from "./NotesApp";
import * as useNotesHook from "../hooks/useNotes";

const mockUseNotes = {
  notes: [{ content: "Test note", timestamp: 1234567890 }],
  getNotes: jest.fn(),
  addNote: jest.fn(),
  deleteNote: jest.fn(),
};

jest.spyOn(useNotesHook, "useNotes").mockReturnValue(mockUseNotes as any);

test("renders NotesApp and adds a note", () => {
  render(<NotesApp />);
  expect(
    screen.getByPlaceholderText("Napisz nową notatkę")
  ).toBeInTheDocument();

  fireEvent.change(screen.getByPlaceholderText("Napisz nową notatkę"), {
    target: { value: "Nowa notatka" },
  });
  fireEvent.click(screen.getByText("Dodaj"));

  expect(mockUseNotes.addNote).toHaveBeenCalledWith("Nowa notatka");
});
