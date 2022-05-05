const { expect } = require("chai");
const { ethers } = require("hardhat");
const { describe } = require("mocha");

// describe("Campaign", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Campaign = await ethers.getContractFactory("Campaign");
//     const campaign = await Campaign.deploy("Hello, world!");
//     await campaign.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

describe("Test Campaign contracts", function () {
  let Campaign;
  let campaign;
  let CampaignFactory;
  let campaignFactory;
  beforeEach(async function () {
    [owner, addr1, addr2, addr3, addr4, addr5] = await ethers.getSigners();
    Campaign = await ethers.getContractFactory("Campaign");
    CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    campaign = await Campaign.deploy(50, owner.address);
    campaignFactory = await CampaignFactory.deploy();
    await campaign.deployed();
    await campaignFactory.deployed();
  });
  describe("Campaign", function () {
    it("Should return 1", async function () {
      expect(await 2).to.equal(2);
    });
    it("Should return 2", async function () {
      expect(await 3).to.equal(3);
    });
  });
});
