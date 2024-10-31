"use client";
import { useEffect, useState, useContext } from "react";
import { useWallet } from "@/components/login/WalletContext";
import { Address, FundraiserItem } from "@/types";
import * as API from "@/services/api";
import { handleNewFundraiser, handleWithdraw } from "@/services/notifications";
import { MyDonations } from "@/types";
import { useEthersSigner } from "./etherSigner";
import { AuthContext } from "@/context/AuthContext";

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
  const { currentAccount } = useContext(AuthContext);
  const [proposals, setProposals] = useState<any[]>([])
  const [mediaArchive, setMediaArchive] = useState<any[]>([])
  const signer = useEthersSigner()

  useEffect(() => {
    let isMounted = true;

    setCurrentSigner(signer);

    if (signer) {
      setCurrentSigner(signer);
    }

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
  }, [currentAccount, signer]);

  useEffect(() => {
    const fetchFundraisers = async () => {
       try {
        const items = await API.fetchFundraisers();
        setFundraisersDetails(items);

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

      const proposals = await instance.getProposals();
      const formattedProposals = proposals.map((proposal) => ({
          id: proposal[0].toString(),
          title: proposal[1],
          description: proposal[2],
          date: proposal[3].toString(),
          upvotes: proposal[4].toString(),
          downvotes: proposal[5].toString()
      }));
      setProposals(formattedProposals)

      const mediaArchives = await instance.getMediaArchive();
        const formattedMediaArchives = mediaArchives.map((mediaArchive) => ({
          id: mediaArchive[0].toString(),
          title: mediaArchive[1],
          description: mediaArchive[2],
          url: mediaArchive[3],
          date: mediaArchive[4].toString(),
        }));

      setMediaArchive(formattedMediaArchives)

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
    proposals,
    mediaArchive
  };
};
