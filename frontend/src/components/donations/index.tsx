"use client"
import React, { useContext, useState, useEffect } from 'react'
import { ProfileContext } from '@/context/ProfileContext';
import DashboardCard from './cards'
import { DollarSign } from "lucide-react";
import Donations from './Donations';
import { ethers } from "ethers";
import * as API from "@/services/api";
import { AuthContext } from '@/context/AuthContext';

const Index = () => {
    const { getTotalDonations, totalDonations, myDonations } =
    useContext(ProfileContext);
  const [balance, setBalance] = useState<Number>(0);
  const [filExchangeRate, setFilExchangeRate] = useState<Number>(0);
  const { currentAccount } = useContext(AuthContext);

  useEffect(() => {
    if (myDonations) {
      getTotalDonations();
    }
  }, [myDonations, getTotalDonations]);

  useEffect(() => {
    const getAddressBalance = async () => {
      const provider = new ethers.providers.JsonRpcProvider(
        `https://api.calibration.node.glif.io/rpc/v1`
      );
      const balance = await provider.getBalance(currentAccount);
      const balanceFormat = ethers.utils.formatEther(balance.toString());
      const exchangeRate = await API.getExchangeRate();
      setFilExchangeRate(exchangeRate)

      setBalance(Number(balanceFormat) * Number(exchangeRate));
    };
    getAddressBalance();
  });


  return (
    <div className='w-full max-w-[1200px] flex flex-col'>
    <div className="flex gap-3 flex-wrap">
       <DashboardCard
                value={`$${balance?.toFixed(
                    2
                  )} USD`}
                title="Wallet Balance"
                icon={<DollarSign />}
              />
              <DashboardCard
                value={`${totalDonations} USD`}
                title="Total Donations "
                icon={<DollarSign />}
              />
              <DashboardCard
                value={`$ ${filExchangeRate} USD`}
                title="1 FIL to USD"
                icon={<DollarSign />}
              /> 
    </div>
    <Donations/>
    </div>
  )
}

export default Index