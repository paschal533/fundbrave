import { ethers, providers } from "ethers";
import cc from "cryptocompare";
import { FundraiserFactoryAddress } from "@/config";
import {
  FundraiserFactory__factory,
  Fundraiser__factory,
} from "@/types/ethers-contracts";
import { handleNewBeneficiary, handleWithdraw } from "@/services/notifications";
import {
  FundraiserItem,
  MyDonations,
  FundraiserDetailsItem,
  FundraiserUserItem,
  Address,
} from "@/types";

export const fetchContract = (
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
) =>
  FundraiserFactory__factory.connect(
    FundraiserFactoryAddress,
    signerOrProvider,
  );

export const fetchFundraiserContract = (
  fundraiserAddress: string,
  signerOrProvider: ethers.Signer | ethers.providers.Provider,
) => Fundraiser__factory.connect(fundraiserAddress, signerOrProvider);

export const fetchFundraisers = async (
  limit = 10,
  offset = 0,
): Promise<FundraiserItem[]> => {
  const provider = new providers.JsonRpcProvider(
    `https://api.calibration.node.glif.io/rpc/v1`,
  );

  const contract = fetchContract(provider);

  const data = await contract.fundraisers(limit, offset);

  const exchangeRate = await getExchangeRate();

  const items = await Promise.all(
    data.map(async (item) => {
      const instance = Fundraiser__factory.connect(item, provider);
      // TODO: Collect all data asynchronously
      const name = await instance.name();
      const description = await instance.description();
      const totalDonations = await instance.totalDonations();
      // @ts-ignore TODO: fix typescript error
      const images = await instance.getImageUrls();
      const categories = await instance.getCategories();
      const { donors, values, dates } = await instance.allDonations();
      const res = await Promise.all(
        dates.map(async (item) => {
          return item.toString();
        }),
      );
      const count = await instance.donationsCount();
      const donationCount = count.toString();
      const country = await instance.region();
      const goal = await instance.goal();
      const goalFormat = goal.toString();
      const amountInETH = ethers.utils.formatEther(totalDonations.toString());

      // @ts-ignore TODO: fix typescript error
      const dollarDonationAmount = amountInETH * exchangeRate;

      return {
        name,
        description,
        dollarDonationAmount,
        categories,
        country,
        values,
        res,
        donors,
        goalFormat,
        images,
        donationCount,
        address: item,
      };
    }),
  );
  // @ts-ignore TODO: fix typescript error
  return items;
};

export const fetchFundraisersDetails = async (
  limit: number,
  offset: number,
  currentAccount: Address,
): Promise<FundraiserUserItem[]> => {
  const provider = new providers.JsonRpcProvider(
    `https://api.calibration.node.glif.io/rpc/v1`,
  );

  const contract = fetchContract(provider);
  const data = await contract.fundraisers(limit, offset);

  const exchangeRate = await getExchangeRate();

  const items = await Promise.all(
    data.map(async (item) => {
      const instance = Fundraiser__factory.connect(item, provider);
      // TODO: Collect all data asynchronously
      const name = await instance.name();
      const totalDonations = await instance.totalDonations();
      const amountInETH = ethers.utils.formatEther(totalDonations.toString());
      const userDonation = await instance.myDonations({
        from: currentAccount,
      });

      const normalizedDonations = await renderDonationsList(userDonation);
      // @ts-ignore TODO: fix typescript error
      const dollarDonationAmount = amountInETH * exchangeRate;

      return {
        name,
        dollarDonationAmount,
        address: item,
        userDonations: normalizedDonations,
      };
    }),
  );

  // @ts-ignore TODO: fix typescript error
  return items;
};

export const fetchFundraiserCampaigns = async (
  limit: number,
  offset: number,
  currentAccount: Address,
): Promise<FundraiserDetailsItem[]> => {
  const provider = new providers.JsonRpcProvider(
    `https://api.calibration.node.glif.io/rpc/v1`,
  );

  const contract = fetchContract(provider);
  const data = await contract.fundraisers(limit, offset);

  const exchangeRate = await getExchangeRate();

  const items = await Promise.all(
    data.map(async (item) => {
      const instance = Fundraiser__factory.connect(item, provider);
      // TODO: Collect all data asynchronously
      const name = await instance.name();
      const totalDonations = await instance.totalDonations();
      const amountInETH = ethers.utils.formatEther(totalDonations.toString());
      const Owner = await instance.owner({ from: currentAccount });

      // @ts-ignore TODO: fix typescript error
      const dollarDonationAmount = amountInETH * exchangeRate;

      return {
        name,
        dollarDonationAmount,
        address: item,
        Owner,
      };
    }),
  );

  // @ts-ignore TODO: fix typescript error
  return items;
};

export default async function getProvider(signer: any) {
  try {
    console.log(signer);
    /*const web3Modal = new Web3Modal({ disableInjectedProvider: true, cacheProvider: true });
    await web3Modal.clearCachedProvider()
    console.log(web3Modal)
     
    const connection = await web3Modal.connect();
    console.log(connection)
    const provider = new ethers.providers.Web3Provider(connection);
    console.log(provider)

    const signer = provider.getSigner();
    console.log(signer)*/

    return signer;
  } catch (error) {
    console.log(error);
  }
}

export const getExchangeRate = async () => {
  const exchangeRate = await cc.price("FIL", ["USD"]);
  return exchangeRate["USD"];
};

export const renderDonationsList = async (donations: MyDonations) => {
  try {
    const exchangeRate = await getExchangeRate();

    if (donations === null) {
      return null;
    }

    const totalDonations = donations.length;

    const donationList = [];

    for (let item of donations) {
      for (let i = 0; i < item.length; i++) {
        const donation = item[i].toString();

        const ethAmount = ethers.utils.formatEther(donation);

        // @ts-ignore TODO: fix typescript error
        const userDonation = exchangeRate * ethAmount;

        let donationDate;

        if (donations.dates[i] === undefined) {
          donationDate = "no date found";
        } else {
          donationDate = donations.dates[i].toString();
        }

        donationList.push({
          donationAmount: userDonation.toFixed(2),
          date: donationDate,
        });
      }
    }

    return donationList;
  } catch (error) {
    console.log(error);
  }
};

export const setBeneficiary = async (
  beneficiary: string,
  address: string,
  currentAccount: string,
  signer: any,
) => {
  if (!currentAccount) {
    return;
  }

  const instance = fetchFundraiserContract(address, signer);
  await instance.setBeneficiary(beneficiary, { from: currentAccount });

  handleNewBeneficiary();
};

export const withdraw = async (
  address: string,
  currentAccount: string,
  signer: any,
) => {
  if (!currentAccount) {
    return;
  }

  const instance = fetchFundraiserContract(address, signer);
  await instance.withdraw({ from: currentAccount });

  handleWithdraw();
};
