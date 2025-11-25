import { expect } from "chai";
import { ethers } from "hardhat";
import { Notes } from "../typechain-types";

describe("Notes", function () {
  let notes: Notes;

  beforeEach(async function () {
    const NotesFactory = await ethers.getContractFactory("Notes");
    notes = (await NotesFactory.deploy()) as Notes;
  });

  it("should add a note and retrieve it", async function () {
    const tx = await notes.addNote("Moja pierwsza notatka");
    await tx.wait();

    const result = await notes.getNotes();
    expect(result[0].content).to.equal("Moja pierwsza notatka");
  });

  it("should delete a note", async () => {
    const [owner] = await ethers.getSigners();
    const Notes = await ethers.getContractFactory("Notes");
    const notes = await Notes.deploy();

    await notes.addNote("Test note");
    await notes.deleteNote(0);

    const allNotes = await notes.getNotes();
    expect(allNotes.length).to.equal(0);
  });
});
