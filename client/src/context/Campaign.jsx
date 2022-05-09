import React, { useContext, useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router";

import campaign from "../utils/Campaign.json";

export const CampaignContext = createContext();

const { ethereum } = window;

const createCampaignContract = (address) => {
  // address = "\"".concat(address).concat("\"")
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const campaignContract = new ethers.Contract(address, campaign.abi, signer);
  return campaignContract;
};

export const CampaignProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  let minimumContribution;
  const [contractAddress, setContractAddress] = useState("");
  const [formContributeCampaign, setFormContributeCampaign] = useState({
    contribution: "",
  });
  const [isLoadingContributeCampaign, setIsLoadingContributeCampaign] =
    useState(false);
  const [detailCampaign, setDetailCampaign] = useState({
    minimumContribution: 0,
    balance: 0,
    numRequests: 0,
    approversCount: 0,
    manager: "",
  });
  const getDetailInfo = async () => {
    try {
      if (ethereum) {
        if (contractAddress == "") return;
        const campaignContract = createCampaignContract(contractAddress);
        const detailOfCampaign = await campaignContract.getSummary();
        minimumContribution = parseInt(detailOfCampaign[0]).toString()
        minimumContribution = ethers.BigNumber.from(minimumContribution)
        minimumContribution = ethers.utils.formatEther(minimumContribution)
        const structuredDetailCampaign = {
          minimumContribution: minimumContribution,
          balance: parseInt(detailOfCampaign[1]),
          numRequests: parseInt(detailOfCampaign[2]),
          approversCount: parseInt(detailOfCampaign[3]),
          manager: detailOfCampaign[4],
        };
        setDetailCampaign(structuredDetailCampaign);
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getDetailInfo();
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object.");
    }
  };

  const handleChangeContributeCampaign = (e, name) => {
    setFormContributeCampaign((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const contributeCampaign = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const { contribution } = formContributeCampaign;
      const campaignContract = createCampaignContract(contractAddress);
      const parseAmount = ethers.utils.parseEther(contribution);
      // console.log(parseAmount)
      const accounts = await ethereum.request({ method: "eth_accounts" });
      // const accounts = ethers.getSigner();
      console.log(accounts[0]);
      await campaignContract.contribute({
        from: accounts[0],
        value: parseAmount,
      });
      setIsLoadingContributeCampaign(true);
      console.log(`Loading contribution`);
      // await campaignContract.contribute({from:accounts[0], value: parseAmount }).wait();
      setIsLoadingContributeCampaign(false);
      console.log(`Success contribution`);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [contractAddress]);

  return (
    <CampaignContext.Provider
      value={{
        contractAddress,
        getDetailInfo,
        detailCampaign,
        setContractAddress,
        handleChangeContributeCampaign,
        isLoadingContributeCampaign,
        formContributeCampaign,
        contributeCampaign,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
