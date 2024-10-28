import { ethers } from "ethers";

// TODO: Most probably contract use values as a field name, that's why it has weird formatting
export type MyDonations = [ethers.BigNumber[], ethers.BigNumber[]] & {
  values: ethers.BigNumber[];
  dates: ethers.BigNumber[];
};

export type Address = string;

export interface FundraiserItem {
  name: string;
  description: string;
  dollarDonationAmount: number;
  website: string;
  images: [string];
  address: Address;
  categories: any[];
  country: string;
  goalFormat: number;
  allDonations: any[];
}

export interface FundraiserDetailsItem {
  name: string;
  Owner: any;
  address: any;
  dollarDonationAmount: any;
}

export interface FundraiserUserItem {
  name: string;
  userDonations: any;
}
