"use client";
import { useContext } from "react";
import { ProfileContext } from "@/context/ProfileContext";
import NotLogin from "@/components/common/NotLogin";
import InfoBar from "@/components/infobar";
import { useWallet } from "@/components/login/WalletContext";
import React from "react";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const { getTotalDonations, totalDonations, myDonations, currentAccount } =
    useContext(ProfileContext);

  if(!currentAccount){
    return(
         <NotLogin/>
    )
  }
    
  return (
    <>
      <InfoBar />
      <div className="w-full align-middle place-content-center justify-center items-center flex">
      <div className="p-4">
                  {Number(totalDonations) == 0 ? (<div className="text-center text-2xl font-bold mt-8">
                    No POAP Received
                  </div>) :
                  (<div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557 ">
                  <img
                    alt="fundraiser-imageURL"
                    src="https://openseauserdata.com/files/d80e3b549642e88b2154664c574ea334.svg"
                     
                    className="shadow-lg rounded-xl"
                     
                  />
                </div>)}
                </div>
      </div>
    </>
  );
};

export default Page;
