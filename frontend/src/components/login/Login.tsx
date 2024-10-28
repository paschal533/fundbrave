"use client";

import { createWalletClient, custom } from "viem";
import { mainnet, filecoinCalibration } from "viem/chains";
import { useWallet } from "./WalletContext";

export default function Login({ width }: any) {
  const {
    connected,
    setConnected,
    walletClient,
    setWalletClient,
    userAddress,
    setUserAddress,
  } = useWallet();

  async function login(e: any) {
    e.preventDefault();
    try {
      // @ts-ignore
      await window.silk.login();
      //@ts-ignore
      await window.silk.requestSBT("phone");
      const newWalletClient = createWalletClient({
        chain: filecoinCalibration,
        // @ts-ignore
        transport: custom(window.silk as any),
      });
      setWalletClient(newWalletClient);
      setConnected(true);
      const [address] = await newWalletClient.requestAddresses();
      setUserAddress(address);
    } catch (err: any) {
      console.error(err);
    }
  }

  async function logout(e: React.MouseEvent) {
    e.preventDefault();
    setConnected(false);
    setWalletClient(undefined);
    setUserAddress("");
  }

  return (
    <div>
      {!connected && !walletClient && userAddress.length === 0 ? (
        <button
          onClick={login}
          className={`${width} rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(60,28,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(60,28,1)]`}
        >
          Log in with Silk
        </button>
      ) : (
        <button
          onClick={logout}
          className={`${width} rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[rgb(60,28,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(60,28,1)]`}
        >
          Logout
        </button>
      )}
    </div>
  );
}
