"use client";
import { useEffect, useState, useContext } from "react";
import { useWallet } from "@/components/login/WalletContext";
import { Address, FundraiserItem } from "@/types";
import * as API from "@/services/api";
import { handleNewFundraiser, handleWithdraw } from "@/services/notifications";
import { MyDonations } from "@/types";
import { useWalletClient, useSwitchChain } from "wagmi";
import { useEthersSigner, clientToSigner } from "./etherSigner";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";
import { filecoinCalibration } from "viem/chains";
import FundraiserFactory from '@/contracts/FundraiserFactory.json';


export const useFundraisers = () => {
  const [isLoadingFundraiser, setIsLoadingFundraiser] = useState(true);
  const [fundraisers, setFundraisers] = useState<FundraiserItem[]>([]);
  const FundraiserCurrency = "FIL";
  const [owner, setIsOwner] = useState(false);
  const [userDonations, setUserDonations] = useState<MyDonations | null>(null);
  const [currentSigner, setCurrentSigner] = useState<any>();
  const [fundraisersDetails, setFundraisersDetails] = useState<
    FundraiserItem[]
  >([]);
  const [loadDonations, setLoadDonations] = useState(true);
  const { userAddress: currentAccount, connected, walletClient, publicClient } = useWallet();
  const { chains, error, switchChain } = useSwitchChain();

    useEffect(() => {
       const init = async () => {
         if(connected && currentAccount && walletClient && publicClient){
           try {
            const [account] = await walletClient.getAddresses();
            const { request } = await publicClient?.simulateContract({
              account,
              address: '0x92e5226E6488Cab69402b047Edd6077ebd19b66E',
              abi: FundraiserFactory.abi,
              functionName: 'currentId',
            })

            console.log(walletClient)
            console.log(chains[0].id)
            switchChain && switchChain({ chainId: chains[0]?.id });
            //@ts-ignore
            const res = await walletClient?.writeContract(request)
            console.log(res)
           }catch(error){
            console.log(error)
           }
         }
       }
       init()
    }, [currentAccount, connected, publicClient, walletClient])

  useEffect(() => {
    let isMounted = true;

    const fetchFundraisers = async () => {
      setIsLoadingFundraiser(true);
      const items = await API.fetchFundraisers();

      if (!isMounted) return;
      setFundraisers(items);
      setIsLoadingFundraiser(false);
    };

    fetchFundraisers();

    return () => {
      isMounted = false;
    };
  }, [currentAccount, connected]);

  useEffect(() => {
    const fetchFundraisers = async () => {
       try {
        const items = await API.fetchFundraisers();
        setFundraisersDetails(items);

         if(currentSigner){
          console.log(currentSigner)
          const contract = API.fetchContract(currentSigner);
          const res = await contract.currentId()
          console.log(res)
         }
       }catch(error){
        console.log(error)
       }
    };

    fetchFundraisers();
  }, [currentSigner]);

  // NOTE: Maybe subscribe to new blocks to update Fundraisers list in real time + New Fundraisers notifications
  //   useEffect(() => {
  //     provider.on("block", fetchFundraisers);
  //     return () => {
  //       provider.off("block", fetchFundraisers);
  //     };
  //   }, [fetchFundraisers]);

  // Get a fundraiser details
  const getFundRaiserDetails = async (address: string) => {
    try {
      if (!currentAccount) {
        return;
      }
      setIsOwner(false);

      //const signer = await getProvider();
      const instance = API.fetchFundraiserContract(address, currentSigner);
      const userDonations = await instance.connect(currentSigner).myDonations();

      const isOwner = await instance.connect(currentSigner).owner();

      if (isOwner.toLowerCase() === currentAccount) {
        setIsOwner(true);
      }

      const normalizedDonations = await API.renderDonationsList(userDonations);
      // @ts-ignore TODO: fix typescript error
      setUserDonations(normalizedDonations);
      setLoadDonations(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Create a fundraiser
  const createAFundraiser = async (
    name: string,
    images: Array<string>,
    categories: Array<string>,
    description: string,
    country: string,
    beneficiary: Address,
    goal: number,
  ) => {
    //const signer = await getProvider();

     try {
      const contract = API.fetchContract(currentSigner);

      const transaction = await contract.createFundraiser(
        name,
        images,
        categories,
        description,
        country,
        beneficiary,
        goal,
      );

      setIsLoadingFundraiser(true);
      await transaction.wait();
      handleNewFundraiser();
      setIsLoadingFundraiser(false);
     }catch(error){
      console.log(error)
     }
  };

  // withdraw funds
  const withdrawalFunds = async (address: string) => {
    if (!currentAccount) {
      return;
    }

    //const signer = await getProvider();

    const instance = API.fetchFundraiserContract(address, currentSigner);
    await instance.withdraw({ from: currentAccount });

    handleWithdraw();
  };

  return {
    isLoadingFundraiser,
    fundraisers,
    userDonations,
    FundraiserCurrency,
    loadDonations,
    setLoadDonations,
    setIsOwner,
    withdrawalFunds,
    getFundRaiserDetails,
    createAFundraiser,
    owner,
    currentSigner,
    fundraisersDetails,
  };
};
