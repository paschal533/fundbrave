import React, { createContext, useContext } from "react";
import { WalletClient } from "viem";

type WalletContextType = {
  connected: boolean | undefined;
  setConnected: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  walletClient: WalletClient | undefined;
  setWalletClient: React.Dispatch<
    React.SetStateAction<WalletClient | undefined>
  >;
  userAddress: string;
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  currentNetwork: string;
  setCurrentNetwork: React.Dispatch<React.SetStateAction<string>>;
  initializeWalletClient: () => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WagmiProvider");
  }
  return context;
};

export default WalletContext;
