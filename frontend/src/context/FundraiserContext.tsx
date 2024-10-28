"use client";
import React from "react";
import { useFundraisers } from "@/hooks/useFundraisers";

type Context = ReturnType<typeof useFundraisers>;

export const FundraiserContext = React.createContext<Context>({} as Context);

interface Props {
  children: React.ReactNode;
}

export const FundraiserProvider = ({ children }: Props) => {
  const value = useFundraisers();

  return (
    <FundraiserContext.Provider value={value}>
      {children}
    </FundraiserContext.Provider>
  );
};
