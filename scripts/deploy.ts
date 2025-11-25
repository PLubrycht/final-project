import { ethers } from "hardhat";

async function main() {
  const NotesFactory = await ethers.getContractFactory("Notes");
  const notes = await NotesFactory.deploy();
  await notes.waitForDeployment();

  console.log("Notes deployed to:", notes.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
