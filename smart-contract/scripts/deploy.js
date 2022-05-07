const fs = require("fs");
const hre = require("hardhat");

const campaign = require("../artifacts/contracts/Campaign.sol/Campaign.json");

const main = async () => {

  const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log("CampaignFactory deployed to:", campaignFactory.address);

  const data = {
    address: campaignFactory.address,
    abi: JSON.parse(campaignFactory.interface.format('json'))
  }
  fs.writeFileSync('../client/src/utils/CampaignFactory.json', JSON.stringify(data));
  const campaignAbi = {
    abi: campaign.abi,
  };
  fs.writeFileSync("../client/src/utils/Campaign.json", JSON.stringify(campaignAbi));

}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

runMain();