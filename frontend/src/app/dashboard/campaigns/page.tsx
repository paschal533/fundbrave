"use client";
import NotLogin from "@/components/common/NotLogin";
import InfoBar from "@/components/infobar";
import { useWallet } from "@/components/login/WalletContext";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext } from "react";
import dynamic from 'next/dynamic'

const Campaign = () => import('@/components/campaigns')

const CampaignConnect = dynamic(Campaign, {ssr: false})

const Page = () => {
  const { currentAccount } = useContext(AuthContext);

  if (!currentAccount) {
    return <NotLogin />;
  }

  return (
    <>
      <InfoBar />
      <div className="w-full align-middle place-content-center justify-center items-center flex">
         <CampaignConnect />
      </div>
    </>
  );
};

export default Page;
