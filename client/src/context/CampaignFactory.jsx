import React, {createContext, useState} from 'react'
import {ethers} from 'ethers'

import campaignFactory from '../utils/CampaignFactory.json'

export const CampaignFactoryContext = createContext();

const {ethereum} = window;

const createCampaignFactoryContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const campaignFactoryContract = new ethers.Contract(campaignFactory.address, campaignFactory.abi, signer);
    return campaignFactoryContract;
}

export const CampaignFactoryProvider = ({children}) =>{
    
    const [currentAccount, setcurrentAccount] = useState("")

    const connectWallet = async() => {
        try {
            if(!ethereum) return alert("Please install metamask");
            const accounts = await ethereum.request({method: 'eth_requestAccounts'})
            setcurrentAccount(accounts[0])
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.")
        }
    }

    return (
        <CampaignFactoryContext.Provider value={{currentAccount, connectWallet}}>
            {children}
        </CampaignFactoryContext.Provider>
    )
}