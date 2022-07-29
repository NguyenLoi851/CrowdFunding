// const fs = require("fs");
const { run } = require("hardhat");
const hre = require("hardhat");

const timeout = async(ms) => {
  return new Promise((resolve)=>setTimeout(resolve, ms));
}

const main = async () => {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const CampaignFactory = await hre.ethers.getContractFactory(
    "CampaignFactory"
  );

  // const campaignFactory = await CampaignFactory.deploy({
  //   gasPrice: ethers.BigNumber.from("20000000000"),
  //   gasLimit: ethers.BigNumber.from("2100000"),
  // });
  const campaignFactory = await CampaignFactory.deploy();

  await campaignFactory.deployed();

  console.log("CampaignFactory deployed to:", campaignFactory.address);

  // const data = {
  //   address: campaignFactory.address,
  //   abi: JSON.parse(campaignFactory.interface.format("json")),
  // };
  // fs.writeFileSync(
  //   "../client/src/utils/CampaignFactory.json",
  //   JSON.stringify(data)
  // );

  await timeout(60000);

  await run("verify:verify",{
    address: campaignFactory.address,
    constructorArguments:[],
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

// 0xABCdf562e6352917cCAEe6e16799296585392784