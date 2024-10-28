"use client";
import { useEffect, useState, useContext } from "react";
import { useWallet } from "@/components/login/WalletContext";
import { FundraiserContext } from "@/context/FundraiserContext";
import { FundraiserDetailsItem } from "@/types";
import * as API from "@/services/api";
import { filter } from "@chakra-ui/react";

const useProfile = () => {
  const [isLoadingUserDonations, setIsLoadingUserDonations] = useState(true);
  const [isLoadingUserCampaigns, setIsLoadingUserCampaigns] = useState(true);
  const [myDonations, setmyDonations] = useState<FundraiserDetailsItem[]>([]);
  const [totalDonations, setTotalDonations] = useState("");
  const [UserCampaigns, setUserCampaigns] = useState([]);
  const [donation, setDonations] = useState<any>([]);
  const { userAddress: currentAccount } = useWallet();
  const { currentSigner } = useContext(FundraiserContext);

  useEffect(() => {
    let isMounted = true;
    const fetchAllFundraiserDonations = async () => {
      if (currentAccount) {
        setIsLoadingUserDonations(true);
        const items = await API.fetchFundraisersDetails(10, 0, currentAccount);

        setDonations(items);

        if (!isMounted) return;
        // @ts-ignore TODO: fix typescript error
        const datas = await Promise.all(
          items.map(async ({ name, userDonations }) => {
            const res =
              userDonations?.length > 0
                ? await Promise.all(
                    userDonations.map(async ({ donationAmount, date }: any) => {
                      return {
                        name,
                        donationAmount,
                        date,
                      };
                    }),
                  )
                : null;
            return res;
          }),
        );

        const result = datas.flat(1);
        const filterResult = result.filter((a) => a !== null);
        setmyDonations(filterResult.filter((a) => a.donationAmount !== "0.00"));
        setIsLoadingUserDonations(false);
      }
    };

    fetchAllFundraiserDonations();

    return () => {
      isMounted = false;
    };
  }, [currentAccount]);

  useEffect(() => {
    let isMounted = true;
    const fetchAllFundraiserCampaigns = async () => {
      if (currentAccount) {
        setIsLoadingUserCampaigns(true);
        const items = await API.fetchFundraiserCampaigns(10, 0, currentAccount);

        if (!isMounted) return;
        // @ts-ignore TODO: fix typescript error
        const data = await Promise.all(
          items.map(async ({ name, Owner, address, dollarDonationAmount }) => {
            const isOwner =
              Owner.toLowerCase() === currentAccount.toLowerCase()
                ? true
                : false;

            return {
              name,
              address,
              isOwner,
              dollarDonationAmount,
            };
          }),
        );

        //@ts-ignore
        setUserCampaigns(data.filter((a: any) => a.isOwner === true));
        setIsLoadingUserCampaigns(false);
      }
    };

    fetchAllFundraiserCampaigns();

    return () => {
      isMounted = false;
    };
  }, [currentAccount]);

  const getTotalDonations = async () => {
    const items = await Promise.all(
      donation.map(async (item: any) => {
        return item.userDonations;
      }),
    );

    const donations: any[] = [];

    items.map((item: any) => {
      // @ts-ignore TODO: fix typescript error
      return item?.map((res) => donations.push(res.donationAmount));
    });

    setTotalDonations(
      donations.reduce((a, b) => Number(a) + Number(b), 0).toFixed(2),
    );
  };

  const setNewBeneficiary = async (address: string, beneficiary: string) => {
    try {
      await API.setBeneficiary(
        beneficiary,
        address,
        currentAccount,
        currentSigner,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const withdraw = async (address: string) => {
    try {
      await API.withdraw(address, currentAccount, currentSigner);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    myDonations,
    isLoadingUserDonations,
    getTotalDonations,
    totalDonations,
    isLoadingUserCampaigns,
    UserCampaigns,
    setNewBeneficiary,
    withdraw,
    currentAccount,
  };
};

export default useProfile;
