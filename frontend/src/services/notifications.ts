import { toast } from "./toast";

// Not Authenticated toast
export const handleNewNotification = () => {
  toast({
    position: "top-left",
    title: "Not Authenticated",
    description: "Please connect to a MetaMask Wallet",
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

// Authenticated toast
export const handleConnect = () => {
  toast({
    position: "top-left",
    title: "Wallet connect",
    description: "Wallet connected successfully",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

// New Fundraiser toast
export const handleNewFundraiser = () => {
  toast({
    position: "top-left",
    title: "New Fundraiser",
    description: "Fundraiser Created",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

// Donation toast
export const handleDonation = (donationValue: string) => {
  toast({
    position: "top-left",
    title: "Donation",
    description: `You have successfully donated $ ${donationValue} USD to the fundraiser`,
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

// New Beneficiary toast
export const handleNewBeneficiary = () => {
  toast({
    position: "top-left",
    title: "New Beneficiary",
    description: "You have successfully changed the beneficiary",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

// Withdraw toast
export const handleWithdraw = () => {
  toast({
    position: "top-left",
    title: "Withdraw",
    description: "You have successfully withdrawn your funds",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};

// Not Authenticated toast
export const handleNotEnough = () => {
  toast({
    position: "top-left",
    title: "Not enough fund",
    description: "Sorry you do not have enough fund to make this transaction",
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export const notifyMetamaskIsNotFounded = () => {
  toast({
    position: "top-left",
    title: "Can't find Metamask",
    description: "Please install MetaMask.",
    status: "error",
    duration: 9000,
    isClosable: true,
  });
};

export const notifyCELOSent = () => {
  toast({
    position: "top-left",
    title: "CELO successfully sent.",
    description: "Fresh CELO are showing up into the wallet.",
    status: "success",
    duration: 9000,
    isClosable: true,
  });
};
