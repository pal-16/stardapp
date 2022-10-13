import { ethers } from "hardhat";

async function main() {
  const TaylorKlay = await ethers.getContractFactory("TaylorKlay");
  const taylorKlay = await TaylorKlay.deploy();
  await taylorKlay.deployed();
  console.log("TaylorKlay deployed to:", taylorKlay.address);  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
