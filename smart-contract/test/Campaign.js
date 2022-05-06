const { expect } = require("chai");
const { ethers, waffle } = require("hardhat");
const { describe } = require("mocha");
const assert = require("assert");

const utils = ethers.utils;

describe("Test Campaign contracts", function () {
  let Campaign;
  let CampaignFactory;
  let campaign;
  let campaignFactory;
  beforeEach(async function () {
    accounts = await ethers.getSigners();
    owner = accounts[0];
    Campaign = await ethers.getContractFactory("Campaign");
    CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    campaign = await Campaign.deploy(5, owner.address);
    campaignFactory = await CampaignFactory.deploy();
    await campaign.deployed();
    await campaignFactory.deployed();
  });
  describe("Campaign", function () {
    it("deploys a factory and a campaign", async function () {
      assert.ok(campaignFactory.address);
      assert.ok(campaign.address);
    });

    it("marks caller as the campaign manager", async function () {
      const manager = await campaign.manager();
      expect(await manager).to.equal(owner.address);
    });

    it("allows people to contribute money and marks them as approvers", async function () {
      await campaign.connect(accounts[1]).contribute({ value: "10" });
      const isContributor = await campaign.approvers(accounts[1].address);
      assert(isContributor);
    });

    it("requires a minimum contribution", async function () {
      try {
        await campaign.connect(accounts[1]).contribute({ value: "2" });
        assert(false);
      } catch (error) {
        assert(error);
      }
    });

    it("allows a manager to make a payment request", async function () {
      await campaign
        .connect(owner)
        .createRequest(
          "Rent a shop in Singapore",
          utils.parseEther("100").toString(),
          accounts[2].address
        );
      const request = await campaign.requests(0);
      expect(await request.description).to.equal("Rent a shop in Singapore");
    });

    it("processes requests", async function () {
      const provider = waffle.provider;
      let beforeBalance = await provider.getBalance(accounts[5].address);
      await campaign
        .connect(accounts[1])
        .contribute({ value: utils.parseEther("8").toString() });
      await campaign
        .connect(accounts[2])
        .contribute({ value: utils.parseEther("15").toString() });
      await campaign
        .connect(accounts[3])
        .contribute({ value: utils.parseEther("5").toString() });
      await campaign
        .connect(owner)
        .createRequest(
          "Buy Google",
          utils.parseEther("100").toString(),
          accounts[4].address
        );
      await campaign
        .connect(owner)
        .createRequest(
          "Buy Shopee",
          utils.parseEther("0.009").toString(),
          accounts[5].address
        );
      await campaign.connect(accounts[1]).approveRequest(1);
      await campaign.connect(accounts[2]).approveRequest(0);
      await campaign.connect(accounts[3]).approveRequest(1);
      await campaign.connect(owner).finalizeRequest(1);
      try {
        await campaign.connect(owner).finalizeRequest(0);
        assert(false);
      } catch (error) {
        assert(error);
      }
      let afterBalance = await provider.getBalance(accounts[5].address);
      expect(
        parseInt(utils.formatEther(afterBalance - beforeBalance))
      ).to.be.closeTo(0.009, 0.01);
    });
  });
});
