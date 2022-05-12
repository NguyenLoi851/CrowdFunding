import React, { useContext, useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router";

import campaign from "../utils/Campaign.json";

export const CampaignContext = createContext();

const { ethereum } = window;

const createCampaignContract = (address) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const campaignContract = new ethers.Contract(address, campaign.abi, signer);
  return campaignContract;
};

export const CampaignProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  let minimumContribution;
  let balance;
  const [campaignAddress, setCampaignAddress] = useState("");
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
  const [formRequest, setFormRequest] = useState({
    description: "",
    value: "",
    recipient: "",
  });

  const [isLoadingNewRequest, setIsLoadingNewRequest] = useState(false);
  const [isLoadingAcceptRequest, setIsLoadingAcceptRequest] = useState(false)
  const [isLoadingFinalizeRequest, setIsLoadingFinalizeRequest] = useState(false)

  const finalizeRequest = async(e, id) => {
    try {
      if (ethereum) {
        if(campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const finalizeRequestOfContract = await campaignContract.finalizeRequest(ethers.BigNumber.from(id),{from: accounts[0]})
        setIsLoadingFinalizeRequest(true)
        await finalizeRequestOfContract.wait()
        setIsLoadingFinalizeRequest(false)
        location.reload()
      } else {
        console.log("Ethereum is not present.")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const acceptRequest = async (e, id) => {
    try {
      if(ethereum){
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const acceptRequestOfContract = await campaignContract.approveRequest(ethers.BigNumber.from(id),{from: accounts[0]})
        setIsLoadingAcceptRequest(true);
        await acceptRequestOfContract.wait()
        setIsLoadingAcceptRequest(false);
        location.reload();
      }else{
        console.log("Ethereum is not present.")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [approversCount, setApproversCount] = useState(0);

  const createNewRequest = async () => {
    try {
      if (ethereum) {
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const parseAmount = ethers.utils.parseEther(formRequest.value);
        const newRequest = await campaignContract.createRequest(
          formRequest.description,
          parseAmount,
          formRequest.recipient,
          { from: accounts[0] }
        );
        setIsLoadingNewRequest(true);
        await newRequest.wait();
        setIsLoadingNewRequest(false);
        location.reload();
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllRequests = async () => {
    try {
      if (ethereum) {
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const requestCountOfContract =
          await campaignContract.getRequestsCount();
        const approversCountOfContract =
          await campaignContract.approversCount();
        setRequestCount(parseInt(requestCountOfContract));
        setApproversCount(parseInt(approversCountOfContract));
        const availableRequests = await Promise.all(
          Array(parseInt(requestCountOfContract))
            .fill()
            .map((element, index) => {
              return campaignContract.requests(index);
            })
        );
        const structuredRequests = availableRequests.map((request) => ({
          description: request.description,
          value: ethers.utils.formatEther(
            ethers.BigNumber.from(parseInt(request.value).toString())
          ),
          recipient: request.recipient,
          complete: request.complete,
          approvalCount: parseInt(request.approvalCount),
        }));
        setRequests(structuredRequests);
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailInfo = async () => {
    try {
      if (ethereum) {
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const detailOfCampaign = await campaignContract.getSummary();
        minimumContribution = parseInt(detailOfCampaign[0]).toString();
        minimumContribution = ethers.BigNumber.from(minimumContribution);
        minimumContribution = ethers.utils.formatEther(minimumContribution);

        balance = parseInt(detailOfCampaign[1]).toString();
        balance = ethers.BigNumber.from(balance);
        balance = ethers.utils.formatEther(balance);

        const structuredDetailCampaign = {
          minimumContribution: minimumContribution,
          balance: balance,
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

  const handleChangeRequest = (e, name) => {
    setFormRequest((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
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
      const campaignContract = createCampaignContract(campaignAddress);
      const parseAmount = ethers.utils.parseEther(contribution);
      const accounts = await ethereum.request({ method: "eth_accounts" });
      const newContribution = await campaignContract.contribute({
        from: accounts[0],
        value: parseAmount,
      });
      setIsLoadingContributeCampaign(true);
      console.log(`Loading contribution`);
      await newContribution.wait();
      setIsLoadingContributeCampaign(false);
      console.log(`Success contribution`);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [campaignAddress]);

  return (
    <CampaignContext.Provider
      value={{
        campaignAddress,
        getDetailInfo,
        detailCampaign,
        setCampaignAddress,
        handleChangeContributeCampaign,
        isLoadingContributeCampaign,
        formContributeCampaign,
        contributeCampaign,
        isLoadingNewRequest,
        formRequest,
        createNewRequest,
        handleChangeRequest,
        getAllRequests,
        requests,
        requestCount,
        approversCount,
        acceptRequest,
        isLoadingAcceptRequest,
        finalizeRequest,
        isLoadingFinalizeRequest
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
