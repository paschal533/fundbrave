import { MetaMaskInpageProvider } from "@metamask/providers";

// NOTE: This is a hack to get around window.ethereum not being defined, nut it's not working yet because of web3modal
declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}
