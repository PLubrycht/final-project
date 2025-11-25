import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NotesABI from "../contracts/Notes.json";

declare global {
  interface Window {
    ethereum?: any;
  }
}

const CONTRACT_ADDRESS = "0x2Ecb637c93f9CAF8E7867edB31C603755456f101";

export const useNotes = () => {
  const [notes, setNotes] = useState<{ content: string; timestamp: number }[]>(
    []
  );

  const getContract = async () => {
    if (!window.ethereum) {
      console.error("MetaMask nie jest zainstalowany!");
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner(); // <-- UWAGA: await
    return new ethers.Contract(CONTRACT_ADDRESS, NotesABI.abi, signer);
  };

  const getNotes = async () => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const notesArray = await contract.getNotes();
      setNotes(notesArray);
    } catch (err) {
      console.error(err);
    }
  };

  const addNote = async (content: string) => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.addNote(content);
      await tx.wait();
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNote = async (index: number) => {
    try {
      const contract = await getContract();
      if (!contract) return;

      const tx = await contract.deleteNote(index);
      await tx.wait();
      getNotes();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { notes, getNotes, addNote, deleteNote };
};
