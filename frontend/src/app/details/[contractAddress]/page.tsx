//@ts-nocheck
"use client";
import { VStack, Text, HStack, Image, Box, Button } from "@chakra-ui/react";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
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

const StyledButton = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-block;
  padding: 14px 24px;
  color: #ffffff;
  background: #1a88f8;
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
  const fundraiserAddress =
    "0xe3e4ef7008b9ebd94626389c287e2da6441fea405471eb268d41cb51b1efc199"; //router.query.address as unknown as Fundraiser;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setFetching(true);
        const items = data; //await API.fetchFundraisers();
        const res = items; //.filter((a : any) => a.address === fundraiserAddress);
        //@ts-ignore
        setFundraiser(res[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setFetching(false);
      }
    };

    fetchDetails();
  }, [fundraiserAddress]);

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

  const MaticAmount = parseFloat(donationValue) / exchangeRate;

  const submitFunds = useCallback(async () => {
    try {
      if (!currentAccount && !currentSigner) {
        return;
      }

      setPaymentModal(false);
      setSending(true);
      //const signer = await API.getProvider();
      /*const instance = API.fetchFundraiserContract(
        fundraiser.address,
        currentSigner
      );
      await instance.connect(currentSigner).donate({
        value: ethers.utils.parseUnits(MaticAmount.toString(), 18),
      });*/

      handleDonation(donationValue);
      setSuccessModal(true);
    } catch (error) {
      console.log(error);
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
        <div className="pl-6 pb-6 pr-6 lg:pt-20 pt-10 flex flex-wrap justify-center items-center w-full">
          <div className="max-w-7xl flex-col justify-center items-center w-full">
            <VStack className={styles.titleContainer}>
              <Text className={styles.title}>{fundraiser.name}</Text>
              <Text className={styles.location}>{fundraiser.region}</Text>
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
              <HStack className="w-full flex sm:justify-center flex-wrap mt-4 mb-4 space-y-2">
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
                <TabList>
                  <Tab w="100%">About</Tab>
                  <Tab w="100%">Updates</Tab>
                  <Tab w="100%">Donations</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {descriptions.map((desc, idx) => (
                      <Text key={idx} pb="1rem" className="text-lg">
                        {desc}
                      </Text>
                    ))}
                  </TabPanel>
                  <TabPanel>
                    <VStack>
                      {updates.map((update, idx) => (
                        <HStack key={idx} className={styles.updateContainer}>
                          <VStack className={styles.updateDate}>
                            <Text className={styles.updateDateText}>
                              {getFormattedDate(update.timestamp)}
                            </Text>
                          </VStack>
                          <VStack className={styles.updateTextContainer}>
                            <Text className={styles.updateTitle}>
                              {update.title}
                            </Text>
                            <Text className={styles.updateSubtitle}>
                              {update.description}
                            </Text>
                          </VStack>
                        </HStack>
                      ))}
                    </VStack>
                  </TabPanel>
                  <TabPanel>
                    {fundraiser.donors ? (
                      <VStack>
                        <div className="flex sm:flex-col w-full justify-center items-center">
                          <VStack
                            className={`${styles.donationHeader} sm:mb-2 mb-0 mr-2 sm:mr-0`}
                          >
                            <Text className={styles.donationHeaderTitle}>
                              {Number(fundraiser.dollarDonationAmount).toFixed(
                                3,
                              )}{" "}
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
                      </VStack>
                    ) : (
                      <h1 className="text-center text-xl mt-4 font-bold">
                        No donation record found
                      </h1>
                    )}
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
            url={`https://crowdflow1.netlify.app/fundraiser-details?address=${fundraiserAddress}`}
          />
          {paymentModal && (
            <div
              onClick={handleClickOutside}
              className="fixed inset-0 flexCenter bg-overlay-black z-40 animated fadeIn"
            >
              <div
                ref={modalRef}
                className="flex flex-col w-2/5 bg-white rounded-lg md:w-11/12 minlg:w-2/4 dark:bg-nft-dark"
              >
                <div className="flex justify-end mt-4 mr-4 minlg:mt-6 minlg:mr-6">
                  <div
                    className="relative w-3 h-3 cursor-pointer minlg:w-6 minlg:h-6"
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
                    <p className="font-normal text-center font-poppins dark:text-white text-nft-black-1 text-bold minlg:text-xl">
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
                        Total SUI:
                      </p>
                      {isExchangedLoaded ? (
                        <p className="text-base font-normal font-poppins dark:text-white text-nft-black-1 minlg:text-xl">
                          {isNaN(MaticAmount) ? 0 : MaticAmount.toFixed(4)}
                          <span className="pl-1 font-semibold">SUI</span>
                        </p>
                      ) : (
                        <Loader />
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4 flexCenter">
                  <div className="flex flex-row sm:flex-col">
                    <BTN
                      btnName="Donate"
                      btnType="primary"
                      classStyles="mr-5 sm:mr-0 sm:mb-5 rounded-xl"
                      handleClick={() => {
                        submitFunds();
                      }}
                    />
                    <BTN
                      btnName="Cancel"
                      btnType="outline"
                      classStyles="rounded-lg"
                      handleClick={() => setPaymentModal(false)}
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
                          color="blue.500"
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
                    <BTN
                      btnName="Print Receipt"
                      btnType="primary"
                      classStyles="sm:mr-0 sm:mb-5 rounded-xl"
                      handleClick={() => setSuccessModal(false)}
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
