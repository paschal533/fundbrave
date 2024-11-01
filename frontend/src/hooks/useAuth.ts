import { useEffect, useRef, useState } from "react";
import MetaMaskOnboarding from "@metamask/onboarding";
import { handleNewNotification, handleConnect } from "@/services/notifications";
import { useAccount, useSwitchChain } from "wagmi";
import { useWallet } from "../components/login/WalletContext";
import { filecoinCalibration } from "viem/chains";
import { createWalletClient } from "viem";
import { useToast } from "@/hooks/use-toast"

const useAuth = () => {
  const onboarding = useRef<MetaMaskOnboarding>();
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  const [accounts, setAccounts] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [closeModal, setCloseModal] = useState<boolean>()
  const { chains, error, switchChain } = useSwitchChain();
  const { toast } = useToast()

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
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Your wallet is not connect to the Dapp.",
      })
      handleNewNotification();
    } else {
      toast({
        title: "Success!: Wallet connected",
        description: "Your wallet is connect to the Dapp.",
      })
    }
  }, [address, chain?.id, chain, isConnecting, toast, switchChain, chains]);

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
    toast({
      title: "Success!: Wallet disconnected",
      description: "Your wallet is disconnected from the Dapp.",
    })
  }

  const connectWallet = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled() && window.ethereum) {
       try {
        setIsLoading(true);
       
      const newAccounts = await window?.ethereum.request({
        method: "eth_requestAccounts",
      });
      //@ts-ignore
      setAccounts(newAccounts[0]);
      toast({
        title: "Success!: Wallet connected",
        description: "Your wallet is connect to the Dapp.",
      })
      setIsLoading(false);
       }catch(error){
        console.log(error)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Your wallet is not connect to the Dapp.",
        })
        handleNewNotification();
       }
    } else {
      onboarding.current?.startOnboarding();
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Your don't have metamask extension.",
      })
      handleNewNotification();
    }
  };

  async function login(e: any) {
    e.preventDefault();
    setCloseModal(true);
    try {
      // @ts-ignore
      await window.silk.loginSelector()
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
      toast({
        title: "Success!: Wallet connected",
        description: "Your wallet is connect to the Dapp.",
      })
    } catch (err: any) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Your wallet is not connect to the Dapp.",
      })
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
    login,
    closeModal,
    setCloseModal
  };
};

export default useAuth;
