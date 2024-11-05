"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import WalletModal from "./WalletModal";

export default function Login({ width, style }: { width?: any; style?: any }) {
  const { connected, walletClient, userAddress, logout, accounts } =
    useContext(AuthContext);

  const verifyConnection =
    !connected && !walletClient && userAddress.length === 0;

  return (
    <div>
      {verifyConnection && !accounts ? (
        <WalletModal width={width} style={style} />
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
