import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";

import campaignFactory from "../utils/CampaignFactory.json";

export const CampaignFactoryContext = createContext();

const { ethereum } = window;

const createCampaignFactoryContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const campaignFactoryContract = new ethers.Contract(
    campaignFactory.address,
    campaignFactory.abi,
    signer
  );
  return campaignFactoryContract;
};

export const CampaignFactoryProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [campaigns, setCampaigns] = useState([]);
  const [formCampaign, setFormCampaign] = useState({ minimumContribution: "" });
  const [isLoadingNewCampaign, setIsLoadingNewCampaign] = useState(false);

  const getAllCampaigns = async () => {
    try {
      if (ethereum) {
        const campaignFactoryContract = createCampaignFactoryContract();
        const availableCampaigns =
          await campaignFactoryContract.getDeployedCampaigns();
        const structuredCampaigns = availableCampaigns.map((campaign) => ({
          address: campaign,
        }));
        setCampaigns(structuredCampaigns);
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
      alert(error.error.message.split(":")[1]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getAllCampaigns();
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      alert(error.error.message.split(":")[1]);
      throw new Error("No ethereum object.");
    }
  };

  const createNewCampaign = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const { minimumContribution } = formCampaign;
      const campaignFactoryContract = createCampaignFactoryContract();
      const parseAmount = ethers.utils.parseEther(minimumContribution);

      const newCampaign = await campaignFactoryContract.createCampaign(
        parseAmount
      );
      setIsLoadingNewCampaign(true);
      console.log(`Loading - ${newCampaign.hash}`);
      await newCampaign.wait();
      setIsLoadingNewCampaign(false);
      console.log(`Success - ${newCampaign.hash}`);
      location.reload();
    } catch (error) {
      console.log(error);
      alert(error.error.message.split(":")[1]);
    }
  };

  const handleChangeCampaign = (e, name) => {
    setFormCampaign((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      location.reload();
    } catch (error) {
      console.log(error);
      alert(error.error.message.split(":")[1]);
      throw new Error("No ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <CampaignFactoryContext.Provider
      value={{
        isLoadingNewCampaign,
        createNewCampaign,
        currentAccount,
        connectWallet,
        handleChangeCampaign,
        formCampaign,
        campaigns,
      }}
    >
      {children}
    </CampaignFactoryContext.Provider>
  );
};
