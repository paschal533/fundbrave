//@ts-nocheck
"use client"
import React, { useState, useEffect } from "react";
import {  useSearchParams  } from "next/navigation";
import Head from "next/head";

const Receipts = () => {
  const [fundraiser, setFundraiser] = useState({
    donation: "",
    name: "",
    date: "",
  });
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!searchParams) return;

    const donation = searchParams.get('donation')
    const date = searchParams.get('date')
    const fundraiser = searchParams.get('fundraiser')

    const formattedDate = new Date(parseInt(date) * 1000);

    setFundraiser({
      donation,
      name: fundraiser,
      date: formattedDate.toString(),
    });
  }, [searchParams]);

  return (
    <div className="dark:text-white text-nft-black-1 h-[80vh] mb-[100px] md:ml-0 ml-3 flex  mt-[-100px] flex-col items-center justify-center py-2">
      <Head>Receipt</Head>
      <h3 className="text-2xl font-bold mb-8">
        Thank you for your donation to {fundraiser.name}
      </h3>

      <div>
        <div className="mb-3">Date of Donation: {fundraiser.date}</div>
        <div>Donation Value: ${Number(fundraiser.donation).toFixed(3)}</div>
      </div>
    </div>
  );
};

export default Receipts;
