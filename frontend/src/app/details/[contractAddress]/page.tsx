//@ts-nocheck
"use client";
import { VStack, Text, HStack, Image, Box, Button } from "@chakra-ui/react";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Spinner,
} from "@chakra-ui/react";
import styles from "@/styles/Cause.module.css";
import SignIn from "@/components/login/Login";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
} from "@chakra-ui/react";
import { useWallet } from "@/components/login/WalletContext";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as API from "@/services/api";
import { handleDonation, handleNotEnough } from "@/services/notifications";
import { shortenAddress } from "@/utils/shortenAddress";
import { FundraiserContext } from "@/context/FundraiserContext";
import { useWalletClient } from "wagmi";
import Modal from "@/components/common/Modal";
import Share from "@/components/common/Share";
import Loader from "@/components/common/Loader";
import BTN from "@/components/common/Button";
import { StaticImageData } from "next/image";
//import { useMatictn } from "@components/KlaytnProvider";
import styled from "styled-components";
import { BsShare } from "react-icons/bs";
import { data } from "@/data/info";
import NavBar from "@/components/common/NavBar";
import { AuthContext } from "@/context/AuthContext";
import MainButton from "@/components/common/MainButton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";
import { useToast } from "@/hooks/use-toast";
import { ethers } from "ethers";

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  color: #ffffff;
  background: #1d1f20;
  width: 350px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 8rem;
  box-shadow: 0 4px 24px -6px #1a88f8;

  @media (max-width: 600px) {
    width: 300px;
  }

  transition: 200ms ease;
  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 6px 40px -6px #1a88f8;
  }
  &:active {
    transform: translateY(-3px);
    box-shadow: 0 6px 32px -6px #1a88f8;
  }

  &:disabled,
  button[disabled] {
    border: 1px solid #999999;
    color: #ffffff;
    background: #83bffb !important;
    cursor: no-drop;
  }
`;

function Cause() {
  const router = useRouter();

  interface Fundraiser {
    address: string;
    description: string;
    dollarDonationAmount: number;
    images: [];
    categories: [];
    country: string;
    res: [];
    donors: [];
    goalFormat: number;
    name: string;
    website: string;
    donationCount: string;
  }
  const {
    owner,
    setLoadDonations,
    loadDonations,
    withdrawalFunds,
    getFundRaiserDetails,
    currentSigner,
    fundraisers,
  } = useContext(FundraiserContext);

  const [sending, setSending] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const { currentAccount } = useContext(AuthContext);
  const [isExchangedLoaded, setIsExchangedLoaded] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<number>(0);
  const [donationValue, setDonationValue] = useState<string>("");
  const [fundraiser, setFundraiser] = useState(null);
  const [fetching, setFetching] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    fundraisers: fundraiserItems,
    isLoadingFundraiser,
    proposals,
    mediaArchive,
    upVote,
    downVote,
  } = useContext(FundraiserContext);
  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    let isMounted = true;

    const loadExchangeRate = async () => {
      setIsExchangedLoaded(false);
      const currentExchangeRate = await API.getExchangeRate();
      if (!isMounted) {
        return;
      }
      setExchangeRate(currentExchangeRate);
      setIsExchangedLoaded(true);
    };

    loadExchangeRate();
    return () => {
      isMounted = false;
    };
  }, []);

  const [paymentModal, setPaymentModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>();

  // check if it is clicked outside of modalRef
  const handleClickOutside = (e: MouseEvent) => {
    if (
      modalRef?.current &&
      !modalRef.current.contains(e.target as HTMLElement)
    ) {
      setPaymentModal(false);
    }
  };

  useEffect(() => {
    // disable body scroll when navbar is open
    if (paymentModal || successModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [paymentModal, successModal]);

  // TODO: Should we use transaction hash instead of address?
  const fundraiserAddress = pathname.slice(9) as unknown as Fundraiser;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (fundraiserItems.length > 0) {
          setFetching(true);
          const items = fundraiserItems;
          const res = items.filter((a: any) => a.address === fundraiserAddress);
          //@ts-ignore
          setFundraiser(res[0]);
        } else {
          setFetching(true);
          const items = await API.fetchFundraisers();
          const res = items.filter((a: any) => a.address === fundraiserAddress);
          //@ts-ignore
          setFundraiser(res[0]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    fetchDetails();
  }, [fundraiserAddress, fundraiserItems]);

  const updates = [
    {
      timestamp: 1664596800000,
      title: "Thank you for the incredible support! ✨",
      description:
        "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
    },
    {
      timestamp: 1663300800000,
      title: "Weather DAO’s committment",
      description:
        "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
    },
  ];

  /*const {
    name,
    country,
    images,
    categories,
    description,
    dollarDonationAmount,
    goalFormat,
    donors,
    donationCount,
  } = fundraiser;*/

  function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  useEffect(() => {
    const GetDonationList = async (address?: any) => {
      if (!address) {
        return;
      }

      try {
        setLoadDonations(true);
        await getFundRaiserDetails(address);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadDonations(false);
      }
    };

    GetDonationList(fundraiserAddress as string);
  }, [fundraiserAddress, getFundRaiserDetails, setLoadDonations]);

  const FilAmount = parseFloat(donationValue) / exchangeRate;

  const submitFunds = useCallback(async () => {
    try {
      if (!currentAccount && !currentSigner) {
        return;
      }

      setPaymentModal(false);
      setSending(true);
      //const signer = await API.getProvider();
      const instance = API.fetchFundraiserContract(
        fundraiser.address,
        currentSigner
      );
      await instance.connect(currentSigner).donate({
        value: ethers.utils.parseUnits(FilAmount.toString(), 18),
      });

      toast({
        title: "Success: Donated!",
        description: `you have successfully donated ${donationValue}`,
      });

      handleDonation(donationValue);
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      handleNotEnough();
    } finally {
      setSending(false);
    }
  }, [
    donationValue,
    currentAccount,
    setSending,
    setSuccessModal,
    currentSigner,
    FilAmount,
    fundraiser,
    toast,
  ]);

  if (fetching) {
    return <Loader />;
  }

  const descriptions = fundraiser?.description.split("\n");

  const perc = Number(fundraiser?.dollarDonationAmount).toFixed(2);

  function getFormattedDateNum(timestamp: number) {
    return new Date(timestamp).toLocaleDateString();
  }

  return (
    <>
      <NavBar name="browse" />
      {fundraiser ? (
        <div className="pl-6 pb-6 pr-6 lg:pt-24 pt-10 flex flex-wrap justify-center items-center w-full">
          <div className="max-w-7xl flex-col justify-center items-center w-full">
            <VStack className={styles.titleContainer}>
              <Text className={styles.title}>{fundraiser.name}</Text>
              <Text className={styles.location}>{fundraiser.country}</Text>
            </VStack>
            <HStack gap={2}>
              <Image
                alt="image 1"
                src={fundraiser.images[0]}
                className={styles.imageOne}
              ></Image>
              <VStack gap={2}>
                <Image
                  alt="image 2"
                  src={fundraiser.images[1]}
                  className={styles.imageTwo}
                ></Image>
                <Image
                  alt="image 3"
                  src={fundraiser.images[2]}
                  className={styles.imageThree}
                ></Image>
              </VStack>
            </HStack>
          </div>
          <div className="flex w-full flex-wrap justify-center items-center">
            <VStack>
              <HStack className="w-full flex lg:justify-start justify-center flex-wrap mt-6 mb-6 space-y-2">
                {fundraiser.categories.slice(0, 3).map((tag, idx) => (
                  <Text key={idx} className={styles.causeTag}>
                    {tag}
                  </Text>
                ))}
              </HStack>
              <HStack className={styles.profileContainer}>
                <Image
                  alt="profile"
                  src="/images/donor_2.png"
                  className={styles.profileImage}
                ></Image>
                <VStack alignItems="flex-start" pl=".5rem">
                  <Text className={styles.profileTitle}>
                    Initiative listed by {shortenAddress(fundraiser.address)}
                  </Text>
                  <HStack>
                    <Image
                      alt="clock"
                      src="/images/clock.png"
                      className={styles.clockIcon}
                    ></Image>
                    <Text className={styles.profileSubtitle}>
                      Created 1 month ago
                    </Text>
                  </HStack>
                </VStack>
              </HStack>
              <Tabs
                colorScheme="#000000"
                size="lg"
                className={styles.tabContainer}
              >
                <TabList className="font-semibold">
                  <Tab w="100%">About</Tab>
                  <Tab w="100%">Updates</Tab>
                  <Tab w="100%">Proposals</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      {descriptions.map((desc, idx) => (
                        <Text key={idx} pb="1rem" className="text-lg">
                          {desc}
                        </Text>
                      ))}
                    </ScrollArea>
                  </TabPanel>
                  <TabPanel>
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      <VStack>
                        {mediaArchive.length > 0 ? (
                          mediaArchive.map((update, idx) => (
                            <div
                              key={idx}
                              className={`${styles.updateContainer} lg:space-x-3 space-y-3 lg:space-y-0 space-x-0 flex lg:flex-row flex-col`}
                            >
                              <VStack>
                                <Image
                                  className="rounded-md"
                                  width={1000}
                                  src={update.url}
                                  alt="image"
                                />
                                {/*<Text className={styles.updateDateText}>
                              {getFormattedDate(Number(update.date))}
                            </Text>*/}
                              </VStack>
                              <VStack className={styles.updateTextContainer}>
                                <Text className={styles.updateTitle}>
                                  {update.title}
                                </Text>
                                <Text className={styles.updateSubtitle}>
                                  {update.description}
                                </Text>
                              </VStack>
                            </div>
                          ))
                        ) : (
                          <h1 className="text-center text-xl mt-4 font-bold">
                            No media record found
                          </h1>
                        )}
                      </VStack>
                    </ScrollArea>
                  </TabPanel>
                  <TabPanel>
                    <ScrollArea className="h-[250px] w-full rounded-md border p-4">
                      {fundraiser.donors ? (
                        <VStack>
                          <div className="flex lg:flex-row flex-col lg:space-x-2 lg:space-y-0 space-x-0 space-y-2 w-full justify-center items-center">
                            <VStack
                              className={`${styles.donationHeader} sm:mb-2 mb-0 mr-2 sm:mr-0`}
                            >
                              <Text className={styles.donationHeaderTitle}>
                                {Number(
                                  fundraiser.dollarDonationAmount
                                ).toFixed(3)}{" "}
                                USD
                              </Text>
                              <Text className={styles.donationHeaderSubtitle}>
                                Total donation amount
                              </Text>
                            </VStack>
                            <VStack className={styles.donationHeader}>
                              <Text className={styles.donationHeaderTitle}>
                                {fundraiser.donationCount}
                              </Text>
                              <Text className={styles.donationHeaderSubtitle}>
                                Donations
                              </Text>
                            </VStack>
                          </div>

                          {proposals.length > 0 ? (
                            proposals.map((proposal, idx) => (
                              <HStack
                                key={idx}
                                className={styles.updateContainer}
                              >
                                <VStack className={styles.updateDate}>
                                  <Text className={styles.updateDateText}>
                                    {getFormattedDate(Number(proposal.date))}
                                  </Text>
                                </VStack>
                                <VStack className={styles.updateTextContainer}>
                                  <Text className={styles.updateTitle}>
                                    {proposal.title}
                                  </Text>
                                  <Text className={styles.updateSubtitle}>
                                    {proposal.description}
                                  </Text>
                                  <HStack>
                                    <HStack className="">
                                      <BiUpvote
                                        onClick={() =>
                                          upVote(
                                            fundraiser.address,
                                            proposal.id
                                          )
                                        }
                                        className="text-2xl cursor-pointer"
                                      />
                                      <Text className="font-semibold">
                                        {proposal.upvotes}
                                      </Text>
                                    </HStack>
                                    <HStack>
                                      <BiDownvote
                                        onClick={() =>
                                          downVote(
                                            fundraiser.address,
                                            proposal.id
                                          )
                                        }
                                        className="text-2xl cursor-pointer"
                                      />
                                      <Text className="font-semibold">
                                        {proposal.downvotes}
                                      </Text>
                                    </HStack>
                                  </HStack>
                                </VStack>
                              </HStack>
                            ))
                          ) : (
                            <h1 className="text-center text-xl mt-4 font-bold">
                              No Proposal record found
                            </h1>
                          )}
                        </VStack>
                      ) : (
                        <h1 className="text-center text-xl mt-4 font-bold">
                          No donation record found
                        </h1>
                      )}
                    </ScrollArea>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </VStack>
            <VStack className={styles.donateContainer}>
              <HStack>
                <Text className={styles.donationText}>
                  {Number(fundraiser.dollarDonationAmount).toFixed(0)} USD
                </Text>
                <Text className={styles.goalText}>
                  raised of {fundraiser.goalFormat} USD Goal
                </Text>
              </HStack>
              <Box className={`${styles.progressBarContainer}`}>
                <Box
                  style={{
                    backgroundColor: "#1D1F20",
                    width: `${(Number(perc) > 0
                      ? (Number(perc) / fundraiser.goalFormat) * 100
                      : 0
                    ).toFixed(3)}%`,
                  }}
                  className={`${styles.progressBar}`}
                ></Box>
              </Box>
              <HStack>
                <Image
                  alt="donation"
                  src="/images/donation.png"
                  className={styles.donationIcon}
                ></Image>
                <Text className={styles.donationTime}>
                  Last donation 11 mins ago
                </Text>
              </HStack>
              {!currentAccount ? (
                <SignIn width="!w-[350px]" />
              ) : (
                <StyledButton onClick={() => setPaymentModal(true)}>
                  Donate now
                </StyledButton>
              )}
              <Button className={styles.shareBtn} onClick={onOpen}>
                <span className="mr-2 mt-1">
                  {" "}
                  <BsShare />
                </span>
                Share cause
              </Button>
            </VStack>
          </div>
          <ToastContainer />
          <Share
            isOpen={isOpen}
            name={fundraiser.name}
            image={fundraiser.images[0]}
            onClose={onClose}
            url={`https://crowdflow1.netlify.app/details/${fundraiserAddress}`}
          />
          {paymentModal && (
            <div
              onClick={handleClickOutside}
              className="fixed inset-0 flexCenter bg-overlay-black z-40 animated fadeIn"
            >
              <div
                ref={modalRef}
                className="flex flex-col bg-white rounded-lg w-11/12 lg:w-2/5 dark:bg-nft-dark"
              >
                <div className="flex justify-end mt-4 mr-4 lg:mt-6 lg:mr-6">
                  <div
                    className="relative w-3 h-3 cursor-pointer lg:w-4 lg:h-4"
                    onClick={() => setPaymentModal(false)}
                  >
                    <Image
                      src="/images/cross.png"
                      //layout="fill"
                      className={"filter invert"}
                      alt="cross-image"
                    />
                  </div>
                </div>

                <div className="w-full p-4 text-center flexCenter">
                  <h2 className="text-2xl font-normal font-poppins dark:text-white text-nft-black-1">
                    Make A Donation
                  </h2>
                </div>
                <div className="p-10 border-t border-b sm:px-4 dark:border-nft-black-3 border-nft-gray-1">
                  <div className="flex flex-col justify-center text-center">
                    <p className="text-center font-poppins dark:text-white text-nft-black-1 font-bold minlg:text-xl">
                      {fundraiser?.name}
                    </p>

                    <div className="flex items-center justify-center w-full my-5">
                      <div className="relative rounded-md w-28 h-28">
                        <Image
                          src={fundraiser.images[0]}
                          alt="fundraiser-imageUrl"
                          //layout="fill"
                          objectFit="cover"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex-row w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 font-poppins dark:text-white text-nft-gray-2 flexBetween">
                        <input
                          title="Donation amount"
                          type="number"
                          min="1"
                          value={donationValue}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setDonationValue(e.target.value)
                          }
                          placeholder="Donation amount in USD"
                          className="flex-1 w-full bg-white outline-none dark:bg-nft-black-1 "
                        />

                        <p className="text-xl font-semibold font-poppins dark:text-white text-nft-black-1">
                          USD
                        </p>
                      </div>
                    </div>

                    <div className="mt-10 flexBetween">
                      <p className="text-base font-semibold font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                        Total FIL:
                      </p>
                      {isExchangedLoaded ? (
                        <p className="text-base font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                          {isNaN(FilAmount) ? 0 : FilAmount.toFixed(4)}
                          <span className="pl-1 font-semibold">FIL</span>
                        </p>
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 flexCenter">
                  <div className="flex lg:space-x-2 lg:space-y-0 space-x-0 space-y-2 lg:flex-row flex-col">
                    <MainButton
                      text="Donate"
                      size="normal"
                      width="100%"
                      className="border-none rounded-[12px]"
                      disabled={donationValue == 0}
                      action={() => {
                        submitFunds();
                      }}
                    />
                    <MainButton
                      text="Cancel"
                      size="normal"
                      action={() => setPaymentModal(false)}
                      className="rounded-[12px] w-full border-[1px] border-[#EDEEF0] bg-white hover:bg-white text-[#31373D]"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {sending && (
            <div className="z-50">
              <Modal
                header="Making donation"
                body={
                  <div className="flex-col z-50 text-center flexCenter">
                    <div className="relative w-52 h-52">
                      <div className="flexCenter h-[10vh] w-full my-4">
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="black"
                          size="xl"
                        />
                      </div>
                    </div>
                  </div>
                }
                handleClose={() => setSending(false)}
              />
            </div>
          )}

          {successModal && (
            <div className="z-50">
              <Modal
                header="Payment Successful"
                body={
                  <div
                    className="flex-col z-50 text-center flexCenter"
                    onClick={() => setSuccessModal(false)}
                  >
                    <div className="relative w-52 h-52">
                      <Image
                        alt="fundraiser"
                        src={fundraiser.images[0] as string}
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                    <p className="mt-10 text-sm font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                      {" "}
                      You successfully donated $ {donationValue} USD to{" "}
                      <span className="font-semibold">{fundraiser.name}</span>
                    </p>
                  </div>
                }
                footer={
                  <div className="flex-col flexCenter">
                    <MainButton
                      text="Close"
                      size="normal"
                      width="100%"
                      className="border-none rounded-[12px]"
                      disabled={donationValue == 0}
                      action={() => setSuccessModal(false)}
                    />
                  </div>
                }
                handleClose={() => setSuccessModal(false)}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="font-md text-xl h-[50vh] w-full text-center">
          No data found, refresh the page...
        </div>
      )}
    </>
  );
}

export default Cause;
