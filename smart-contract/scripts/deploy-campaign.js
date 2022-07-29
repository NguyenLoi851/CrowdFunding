// const fs = require("fs");
const { ethers, run } = require("hardhat");
const hre = require("hardhat");

const timeout = async(ms) => {
  return new Promise((resolve)=>setTimeout(resolve, ms));
}

const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  // const campaignAbi = {
  //   abi: campaign.abi,
  // };
  // fs.writeFileSync(
  //   "../client/src/utils/Campaign.json",
  //   JSON.stringify(campaignAbi)
  // );
  const Campaign = await ethers.getContractFactory("Campaign");
  const minimum = 500000000000;
  const id = "62342323523535";
  const acceptThreshold = 50;
  const creator = '0x6182EEb1bBFC995dCC4E34E6614365D797e02998';
  const campaign = await Campaign.deploy(minimum, id, acceptThreshold, creator);
  await campaign.deployed();

  console.log("Contract is deployed at: ", campaign.address);

  await timeout(60000);

  await run("verify:verify",{
    address: campaign.address,
    constructorArguments: [minimum, id, acceptThreshold, creator],
    contract: "contracts/Campaign.sol:Campaign"
  })
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// 0xC1675a2A1a7fd2D1D44202B89AB87Fb55008b6ab