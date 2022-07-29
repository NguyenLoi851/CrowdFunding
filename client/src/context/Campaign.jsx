import React, { useContext, useState, createContext, useEffect } from "react";
import { ethers } from "ethers";
import { useParams } from "react-router";
import { apiUrl } from "../utils/constants";
import axios from "axios";

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
  const [isAcceptedRequest, setIsAcceptedRequest] = useState(false);
  const [error, setError] = useState("")
  let minimumContribution;
  let balance;
  let acceptThreshold;
  // let totalBalances;
  const [totalBalances, setTotalBalances] = useState(0);
  const [idCampaign, setIdCampaign] = useState("");
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [detailInfor, setDetailInfor] = useState("");
  const [imageURL, setImageURL] = useState("");
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
    acceptThreshold: 0,
  });
  const [formRequest, setFormRequest] = useState({
    description: "",
    value: "",
    recipient: "",
  });

  const [isLoadingNewRequest, setIsLoadingNewRequest] = useState(false);
  const [isLoadingAcceptRequest, setIsLoadingAcceptRequest] = useState(false);
  const [isLoadingFinalizeRequest, setIsLoadingFinalizeRequest] =
    useState(false);
  const [requests, setRequests] = useState([]);
  const [requestCount, setRequestCount] = useState(0);
  const [approversCount, setApproversCount] = useState(0);

  const finalizeRequest = async (e, id) => {
    try {
      if (ethereum) {
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        // const provider = new ethers.providers.Web3Provider(ethereum);
        // const nonceDebug = await provider.getTransactionCount("0x6182EEb1bBFC995dCC4E34E6614365D797e02998");
        // console.log("Nonce", nonceDebug)
        // const gasPriceDebug = await provider.getGasPrice()
        // console.log("gasPrice", parseInt(gasPriceDebug))
        console.log(accounts[0]);
        const finalizeRequestOfContract =
          await campaignContract.finalizeRequest(ethers.BigNumber.from(id), {
            from: accounts[0],
            // gasPrice: ethers.BigNumber.from("50000000000"),
            // gasLimit: ethers.BigNumber.from("5000000"),
          });
        setIsLoadingFinalizeRequest(true);
        await finalizeRequestOfContract.wait();
        setIsLoadingFinalizeRequest(false);
        location.reload();
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message.split(":")[1]);
    }
  };

  const acceptRequest = async (e, id) => {
    try {
      if (ethereum) {
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const acceptRequestOfContract = await campaignContract.approveRequest(
          ethers.BigNumber.from(id),
          { from: accounts[0] }
        );
        setIsLoadingAcceptRequest(true);
        await acceptRequestOfContract.wait();
        setIsAcceptedRequest(true);
        setIsLoadingAcceptRequest(false);
        location.reload();
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message.split(":")[1]);
    }
  };

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
      alert(error.data.message.split(":")[1]);
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
          approvalBalances: parseInt(request.approvalBalances),
        }));
        setRequests(structuredRequests);
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message.split(":")[1]);
    }
  };

  const getDetailInfo = async () => {
    try {
      if (ethereum) {
        if (campaignAddress == "") return;
        const campaignContract = createCampaignContract(campaignAddress);
        const _id = await campaignContract.id();
        setIdCampaign(_id);
        try {
          // console.log(_id);
          let response = await axios.get(`${apiUrl}/campaigns/${_id}`);
          // console.log(response);
          setTitle(response.data.campaign.title);
          setIntroduction(response.data.campaign.introduction);
          setImageURL(response.data.campaign.imageURL);
          setDetailInfor(response.data.campaign.detailInfor);
        } catch (error) {
          return error.response.data
            ? error.response.data
            : { success: false, message: "Server error" };
        }
        const detailOfCampaign = await campaignContract.getSummary();
        minimumContribution = parseInt(detailOfCampaign[0]).toString();
        minimumContribution = ethers.BigNumber.from(minimumContribution);
        minimumContribution = ethers.utils.formatEther(minimumContribution);

        // acceptThreshold = parseInt(detailOfCampaign[5]).toString();
        let totalBalancesTmp = parseInt(detailOfCampaign[1]).toString();
        totalBalancesTmp = ethers.BigNumber.from(totalBalancesTmp);
        totalBalancesTmp = ethers.utils.formatEther(totalBalancesTmp);
        setTotalBalances(totalBalancesTmp);
        // const totalBalances = 0;
        // console.log("Total balances", totalBalances);
        acceptThreshold = detailOfCampaign[5].toString();
        // console.log("Accept Threshold", acceptThreshold);
        // console.log("Hello", detailOfCampaign)
        balance = parseInt(detailOfCampaign[1]).toString();
        balance = ethers.BigNumber.from(balance);
        balance = ethers.utils.formatEther(balance);

        const structuredDetailCampaign = {
          minimumContribution: minimumContribution,
          balance: balance,
          numRequests: parseInt(detailOfCampaign[2]),
          approversCount: parseInt(detailOfCampaign[3]),
          manager: detailOfCampaign[4],
          acceptThreshold: acceptThreshold,
        };
        setDetailCampaign(structuredDetailCampaign);
      } else {
        console.log("Ethereum is not present.");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message.split(":")[1]);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        getDetailInfo();
        // getIsAcceptedRequest();
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
      alert(error.data.message.split(":")[1]);
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
      // console.log(error);
      console.log(error.data.message.split(":")[1]);
      // setError(error.data.message.split(":")[1]);
      alert(error.data.message.split(":")[1]);
      // alert(error.data.message.split(":")[1]);
    }
  };

  const getIsAcceptedRequest = async () => {
    try {
      if(!ethereum) return alert("Please install metamask");
      if(campaignAddress=="" || currentAccount=="") return;
      const campaignContract = createCampaignContract(campaignAddress);
      // console.log(campaignContract)
      const accept = await campaignContract.approvers(currentAccount);
      console.log("Accept", accept)
      setIsAcceptedRequest(accept);
    } catch (error) {
      // console.log(error.data.message.split(":")[1]);
      // alert(error.data.message.split(":")[1]);
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    // getIsAcceptedRequest();
  }, [campaignAddress]);

  return (
    <CampaignContext.Provider
      value={{
        currentAccount,
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
        isLoadingFinalizeRequest,
        idCampaign,
        introduction,
        title,
        detailInfor,
        imageURL,
        acceptThreshold,
        totalBalances,
        isAcceptedRequest,
        getIsAcceptedRequest,
        // error,
        // setError
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};
