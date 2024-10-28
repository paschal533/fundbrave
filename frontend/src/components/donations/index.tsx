"use client"
import React, { useContext, useState } from 'react'
import { ProfileContext } from '@/context/ProfileContext';
import DashboardCard from './cards'
import { DollarSign } from "lucide-react";
import Donations from './Donations';

const Index = () => {
    const { getTotalDonations, totalDonations, myDonations } =
    useContext(ProfileContext);
  const [balance, setBalance] = useState<Number>(0);

  return (
    <div className='w-full flex flex-col'>
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
                value={`$ ETH`}
                title="Maximum Borrowable"
                icon={<DollarSign />}
              /> 
    </div>
    <Donations/>
    </div>
  )
}

export default Index