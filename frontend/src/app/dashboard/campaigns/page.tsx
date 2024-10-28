"use client";
import Campaigns from "@/components/campaigns";
import NotLogin from "@/components/common/NotLogin";
import InfoBar from "@/components/infobar";
import { useWallet } from "@/components/login/WalletContext";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  const { userAddress: currentAccount } = useWallet();

  if(!currentAccount){
    return(
         <NotLogin/>
    )
  }
    
  return (
    <>
      <InfoBar />
      <div className="w-full align-middle place-content-center justify-center items-center flex">
        <Campaigns/>
      </div>
    </>
  );
};

export default Page;
