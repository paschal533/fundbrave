"use client";
import { useCallback, useEffect, useState } from "react";
import { initSilk } from "@silk-wallet/silk-wallet-sdk";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from "@/lib/config";
import WalletContext from "@/components/login/WalletContext";
import { http, createPublicClient, WalletClient, createWalletClient, custom, PublicClient, Account } from "viem";
import { mainnet, sepolia, filecoinCalibration } from "viem/chains";

const queryClient = new QueryClient();

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [connected, setConnected] = useState<boolean | undefined>(undefined);
  const [walletClient, setWalletClient] = useState<WalletClient | undefined>(
    undefined,
  );
  const [publicClient, setPublicClient] = useState<PublicClient | undefined>(
    undefined,
  );
  const [userAddress, setUserAddress] = useState("");
  const [currentNetwork, setCurrentNetwork] = useState("calibration");
  const [account, setAccount] = useState<Account | undefined>(undefined);

  const initializeWalletClient = useCallback(() => {
    let network = null;
    switch (currentNetwork) {
      case "mainnet":
        network = mainnet;
        break;
      case "sepolia":
        network = sepolia;
        break;
      case "calibration":
        network = filecoinCalibration;
        break;
      default:
        network = filecoinCalibration;
        break;
    }
    const newWalletClient = createWalletClient({
      chain: filecoinCalibration,
      // @ts-ignore
      transport: custom(window.silk as any),
    });
    const newPublicClient = createPublicClient({
      chain: filecoinCalibration,
      transport: http()
    })
    setPublicClient(newPublicClient);
    setWalletClient(newWalletClient);
  }, [currentNetwork]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const silk = initSilk();
    // @ts-ignore
    window.silk = silk

    const checkConnection = async () => {
      try {
        // @ts-ignore
        const accounts = await window.silk.request({ method: "eth_accounts", params: [{ chainId: '0x4cb2f' }] });
        //@ts-ignore
        if (accounts?.length > 0) {
          //@ts-ignore
          setUserAddress(accounts[0]);
          setConnected(true);
          initializeWalletClient();
        } else {
          setConnected(false);
        }
      } catch (err) {
        console.error("Error checking connection:", err);
        setConnected(false);
      }
    };
    checkConnection();
  }, [initializeWalletClient]);

  return (
    <WalletContext.Provider
      value={{
        connected,
        setConnected,
        walletClient,
        setWalletClient,
        userAddress,
        setUserAddress,
        currentNetwork,
        setCurrentNetwork,
        initializeWalletClient,
        publicClient,
        setPublicClient
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </WalletContext.Provider>
  );
}
