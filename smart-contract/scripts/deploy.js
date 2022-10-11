const hre = require("hardhat");

async function main() {
  const Minter7 = await hre.ethers.getContractFactory("Minter7");
  console.log(Minter7);
  const minter7 = await Minter7.deploy();
  await minter7.deployed();
  console.log("Minter7 deployed to:", minter7.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
