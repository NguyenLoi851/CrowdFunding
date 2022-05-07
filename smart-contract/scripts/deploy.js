const fs = require("fs");
const hre = require("hardhat");

const main = async () => {

  const CampaignFactory = await hre.ethers.getContractFactory("CampaignFactory");
  const campaignFactory = await CampaignFactory.deploy();

  // const Campaign = await hre.ethers.getContractFactory("Campaign");
  // const campaign = await Campaign.deploy();

  await campaignFactory.deployed();

  // await campaign.deployed();

  console.log("CampaignFactory deployed to:", campaignFactory.address);

  // console.log("Campaign deployed to:", campaign.address);

  const data = {
    address: campaignFactory.address,
    abi: JSON.parse(campaignFactory.interface.format('json'))
  }
  fs.writeFileSync('../client/src/utils/CampaignFactory.json', JSON.stringify(data));
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