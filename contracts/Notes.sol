// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Notes {
    struct Note {
        string content;
        uint256 timestamp;
    }

    mapping(address => Note[]) private notes;

    event NoteAdded(address indexed user, uint256 index, string content);

    function addNote(string calldata content) external {
        notes[msg.sender].push(Note(content, block.timestamp));
        emit NoteAdded(msg.sender, notes[msg.sender].length - 1, content);
    }

    function getNotes() external view returns (Note[] memory) {
        return notes[msg.sender];
    }

    function deleteNote(uint256 index) external {
        require(index < notes[msg.sender].length, "Invalid index");
        notes[msg.sender][index] = notes[msg.sender][notes[msg.sender].length - 1];
        notes[msg.sender].pop();
    }
}
