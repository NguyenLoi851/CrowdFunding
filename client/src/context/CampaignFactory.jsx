import React, { createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import campaignFactory from "../utils/CampaignFactory.json";
import campaign from "../utils/Campaign.json";
import { apiUrl } from "../utils/constants";

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
  const [formCampaign, setFormCampaign] = useState({
    minimumContribution: "",
    title: "",
    introduction: "",
    imageURL: "",
    acceptThreshold: "",
    detailInfor: ""
  });
  const [isLoadingNewCampaign, setIsLoadingNewCampaign] = useState(false);
  const [introductions, setIntroductions] = useState([])
  const [titles, setTitles] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const getAllCampaigns = async () => {
    try {
      if (ethereum) {
        const campaignFactoryContract = createCampaignFactoryContract();
        const availableCampaigns =
          await campaignFactoryContract.getDeployedCampaigns();
        for (let i = 0; i < availableCampaigns.length; i++) {
          let provider = new ethers.providers.Web3Provider(ethereum);
          let signer = provider.getSigner();
          let campaignContract = new ethers.Contract(
            availableCampaigns[i],
            campaign.abi,
            signer
          );
          let _id = await campaignContract.id();
          try {
            let response = await axios.get(`${apiUrl}/campaigns/${_id}`);
            setIntroductions(prevState => [...prevState, response.data.campaign.introduction])
            setTitles(prevState => [...prevState, response.data.campaign.title])
            setImageURLs(prevState => [...prevState, response.data.campaign.imageURL])
          } catch (error) {
            return error.response.data
              ? error.response.data
              : { success: false, message: "Server error" };
          }
        }
        const structuredCampaigns = availableCampaigns.map((campaign,idx) => ({
          address: campaign,
          introduction: introductions[idx]
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
      let _id = "";
      const {  minimumContribution, title, introduction, imageURL, acceptThreshold ,detailInfor } = formCampaign;
      // Add to server
      try {
        const response = await axios.post(`${apiUrl}/campaigns`, {
          title,
          introduction,
          detailInfor,
          imageURL
        });
        if (response.data.success) {
          _id = response.data.campaign._id;
        }
      } catch (error) {
        return error.response.data
          ? error.response.data
          : { success: false, message: "Server error" };
      }

      const campaignFactoryContract = createCampaignFactoryContract();
      const parseAmount = ethers.utils.parseEther(minimumContribution);
      // console.log(typeof(_id));
      // console.log(typeof(ethers.utils.formatBytes32String(_id)));
      const newCampaign = await campaignFactoryContract.createCampaign(
        parseAmount,
        // ethers.utils.formatBytes32String(_id)
        _id
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
        introductions,
        titles,
        imageURLs
      }}
    >
      {children}
    </CampaignFactoryContext.Provider>
  );
};
