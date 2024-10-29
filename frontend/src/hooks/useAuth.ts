import { useEffect, useRef, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { handleNewNotification, handleConnect } from "@/services/notifications";
import { useAccount, useSwitchChain } from "wagmi";
import { useWallet } from "../components/login/WalletContext";
import { filecoinCalibration } from "viem/chains";

const useAuth = () => {
  const onboarding = useRef<MetaMaskOnboarding>();
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  const [accounts, setAccounts] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const { chains, error, switchChain } = useSwitchChain();
  const {
    connected,
    setConnected,
    walletClient,
    setWalletClient,
    userAddress,
    setUserAddress,
  } = useWallet();

  useEffect(() => {
    if(address){
      setAccounts(address)
    }else if(userAddress){
     setAccounts(userAddress)
    }else{
      setAccounts("")
    }
  }, [address, userAddress])


  useEffect(() => {
    setAccounts(address);

    if (!isConnecting && chains[0]?.id !== chain?.id) {
      //@ts-ignore
      switchChain && switchChain(chains[0].id);
    }
    if (address?.length === undefined) {
      handleNewNotification();
    } else {
      handleConnect();
    }
  }, [address, chain?.id, chain, isConnecting, switchChain, chains]);

  /** Check if connected */
  /*useEffect(() => {
    let isMounted = true;

    function handleNewAccounts(newAccounts: string[]) {
      if (!isMounted) {
        return;
      }
      setAccounts(newAccounts);
    }

    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleNewAccounts);
      window.ethereum.on("accountsChanged", handleNewAccounts);
      return () => {
        isMounted = false;
        window.ethereum.removeListener("accountsChanged", handleNewAccounts);
      };
    } else {
      notifyMetamaskIsNotFounded();
    }
  }, []);*/

  async function logout(e: React.MouseEvent) {
    e.preventDefault();
    setConnected(false);
    setWalletClient(undefined);
    setUserAddress("");
    setAccounts(null);
  }

  const connectWallet = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      setIsLoading(true);
      //@ts-ignore
      const newAccounts: string[] = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      
      setAccounts(newAccounts[0]);
      setIsLoading(false);
    } else {
      onboarding.current?.startOnboarding();
    }
  };

  async function login(e: any) {
    e.preventDefault();
    try {
      // @ts-ignore
      await window.ethereum.loginSelector()
      //@ts-ignore
      //await window.ethereum.requestSBT("phone");
      const newWalletClient = createWalletClient({
        chain: filecoinCalibration,
        // @ts-ignore
        transport: custom(window.ethereum as any),
      });
      setWalletClient(newWalletClient);
      setConnected(true);
      const [address] = await newWalletClient.requestAddresses();
      setUserAddress(address);
    } catch (err: any) {
      console.error(err);
    }
  }

  const disconnectWallet = async () => {};

  return {
    accounts,
    currentAccount: accounts,
    isLoading,
    connectWallet,
    disconnectWallet,
    connected,
    setConnected,
    walletClient,
    setWalletClient,
    userAddress,
    setUserAddress,
    logout,
    login
  };
};

export default useAuth;
