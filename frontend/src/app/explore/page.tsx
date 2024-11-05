"use client";
import React, { useState, useContext } from "react";
import NavBar from "@/components/common/NavBar";
import Banner from "@/components/common/Banner";
import SearchBar from "@/components/common/SearchBar";
import FooterSection from "@/components/sections/FooterSection";
import ReadyToBuildSection from "@/components/sections/ReadyToBuildSection";
import {
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Box,
  Button,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import styles from "@/styles/Browse.module.css";
import Link from "next/link";
import { FundraiserContext } from "@/context/FundraiserContext";
import { shortenAddress } from "@/utils/shortenAddress";
import arrow from "../../../public/images/arrow.png";

function Explore() {
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideButtons, setHideButtons] = useState(false);
  const [activeSelect, setActiveSelect] = useState("Recently Added");
  const [clicked, setClicked] = useState(false);
  const [cat, setCat] = useState("");
  const [toggle, setToggle] = useState(false);
  const { fundraisers, isLoadingFundraiser } = useContext(FundraiserContext);
  const perc = (amount: any) => {
    return Number(amount).toFixed(2);
  };

  const onHandleSearch = (value: any) => {
    const filteredNfts = nfts.filter(({ name }: any) =>
      name?.toLowerCase().includes(value.toLowerCase())
    );

    if (filteredNfts.length === 0) {
      setNfts(nftsCopy);
    } else {
      setNfts(filteredNfts);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <main className="">
      <NavBar name="browse" />
      <div className="relative flex justify-center place-content-center align-middle items-center w-full">
        <div className="max-w-[1400px] w-full relative">
          <div className="lg:p-14 p-2 justify-center w-full">
            <Banner
              name={
                <>
                  The slightest help from you, <br />
                  means a lot to us.
                </>
              }
              childStyles="lg:text-4xl text-md xs:text-xl text-left"
              parentStyle="justify-start max-w-[2000px] mb-2 mt-10 h-72 sm:h-60 p-12 sm:p-4 xs:p-4 xs:h-44 rounded-3xl"
            />
          </div>

          <div className="flexBetween lg:pl-14 lg:pr-14 pr-0 pl-0 mx-4 xs:mx-0 minlg:mx-8 lg:flex lg:flex-row flex-col sm:items-start">
            <h1 className="flex-1 mt-1 font-poppins dark:text-white text-nft-black-1 text-3xl minlg:text-4xl font-semibold lg:mb-0 mb-4">
              Top Fundraisers 🔥
            </h1>

            <div className="flex-2 sm:w-full flex lg:flex-row flex-col">
              <SearchBar
                activeSelect={activeSelect}
                setActiveSelect={setActiveSelect}
                handleSearch={onHandleSearch}
                clearSearch={onClearSearch}
              />
            </div>
          </div>
        </div>
      </div>

      <VStack>
        {clicked ? (
          <div className="w-full flex flex-wrap justify-start mt-8 md:justify-center">
            {!isLoadingFundraiser
              ? fundraisers
                  .filter(({ categories }) => categories.includes(cat))
                  .map((fundraiser, index) => {
                    return (
                      <Link
                        key={index}
                        href={{
                          pathname: `/details/${fundraiser.address}`,
                        }}
                      >
                        <VStack
                          className={`${styles.causeContainer} ml-2 sm:ml-0 sm:mb-4 mb-4 mt-4`}
                          cursor="pointer"
                        >
                          <HStack className={styles.profileCell}>
                            <Image
                              alt="0xcarhartt"
                              src="/images/donor_2.png"
                              className={styles.profileImage}
                            ></Image>
                            <Text className={styles.profileName}>
                              {shortenAddress(fundraiser.address)}
                            </Text>
                          </HStack>
                          <Image
                            alt="featured 1"
                            src={fundraiser.images[0]}
                            className={styles.causeImage}
                          ></Image>
                          <VStack className={styles.causeTextContainer}>
                            <Text className={styles.causeTitle}>
                              {fundraiser.name}
                            </Text>
                            <Text
                              className={styles.causeSubtitle}
                            >{`Last donation 15 mins ago`}</Text>
                            <HStack className={styles.scoreContainer}>
                              <Box className={`${styles.progressBarContainer}`}>
                                <Box
                                  style={{
                                    backgroundColor: "#1D1F20",
                                    width: `${(Number(
                                      perc(fundraiser.dollarDonationAmount)
                                    ) > 0
                                      ? (Number(
                                          perc(fundraiser.dollarDonationAmount)
                                        ) /
                                          fundraiser.goalFormat) *
                                        100
                                      : 0
                                    ).toFixed(3)}%`,
                                  }}
                                  className={`${styles.progressBar}`}
                                ></Box>
                              </Box>
                            </HStack>
                            <HStack>
                              <Image
                                alt="money icon"
                                src="/images/money.png"
                                width="20px"
                              ></Image>
                              <Text
                                fontSize="16px"
                                fontWeight={500}
                                color="#5A5A5A"
                              >
                                {`${fundraiser.dollarDonationAmount.toFixed(
                                  3
                                )} USD raised of ${fundraiser.goalFormat} USD`}
                              </Text>
                            </HStack>
                          </VStack>
                        </VStack>
                      </Link>
                    );
                  })
              : [1, 2, 3].map((item, i) => {
                  return (
                    <Box
                      key={i}
                      padding="6"
                      boxShadow="lg"
                      className="flex-1 p-4 m-2 bg-white box-shadow shadow-md cursor-pointer dark:bg-nft-black-3 rounded-2xl minlg:m-8 sm:my-2 sm:mx-2"
                    >
                      <div className="relative overflow-hidden sm:w-full h-72 sm:h-36 xs:h-56 minmd:h-60 lg:h-[350px] rounded-2xl">
                        <SkeletonCircle size="12" />
                        <SkeletonText mt="4" noOfLines={6} spacing="4" />
                      </div>
                    </Box>
                  );
                })}
          </div>
        ) : (
          <div className="w-full flex max-w-7xl space-x-3 flex-wrap justify-start mt-8 md:justify-center">
            {!isLoadingFundraiser
              ? fundraisers.slice(0, 6).map((fundraiser, index) => {
                  return (
                    <Link
                      key={index}
                      href={{
                        pathname: `/details/${fundraiser.address}`,
                      }}
                    >
                      <VStack
                        className={`${styles.causeContainer} ml-2 sm:ml-0 sm:mb-4 mb-4 mt-4`}
                        cursor="pointer"
                      >
                        <HStack className={styles.profileCell}>
                          <Image
                            alt="0xcarhartt"
                            src="/images/donor_2.png"
                            className={styles.profileImage}
                          ></Image>
                          <Text className={styles.profileName}>
                            {shortenAddress(fundraiser.address)}
                          </Text>
                        </HStack>
                        <Image
                          alt="featured 1"
                          src={fundraiser.images[0]}
                          className={styles.causeImage}
                        ></Image>
                        <VStack className={styles.causeTextContainer}>
                          <Text className={styles.causeTitle}>
                            {fundraiser.name}
                          </Text>
                          <Text
                            className={styles.causeSubtitle}
                          >{`Last donation 15 mins ago`}</Text>
                          <HStack className={styles.scoreContainer}>
                            <Box className={`${styles.progressBarContainer}`}>
                              <Box
                                style={{
                                  backgroundColor: "#1D1F20",
                                  width: `${(Number(
                                    perc(fundraiser.dollarDonationAmount)
                                  ) > 0
                                    ? (Number(
                                        perc(fundraiser.dollarDonationAmount)
                                      ) /
                                        fundraiser.goalFormat) *
                                      100
                                    : 0
                                  ).toFixed(3)}%`,
                                }}
                                className={`${styles.progressBar}`}
                              ></Box>
                            </Box>
                          </HStack>
                          <HStack>
                            <Image
                              alt="money icon"
                              src="/images/money.png"
                              width="20px"
                            ></Image>
                            <Text
                              fontSize="16px"
                              fontWeight={500}
                              color="#5A5A5A"
                            >
                              {`${fundraiser.dollarDonationAmount.toFixed(
                                3
                              )} USD raised of ${fundraiser.goalFormat} USD`}
                            </Text>
                          </HStack>
                        </VStack>
                      </VStack>
                    </Link>
                  );
                })
              : [1, 2, 3].map((item, index) => {
                  return (
                    <Box
                      key={index}
                      padding="6"
                      boxShadow="lg"
                      className="flex-1 p-4 m-2 bg-white box-shadow shadow-md cursor-pointer dark:bg-nft-black-3 rounded-2xl minlg:m-8 sm:my-2 sm:mx-2"
                    >
                      <div className="relative overflow-hidden sm:w-full h-72 sm:h-36 xs:h-56 minmd:h-60 lg:h-[350px] rounded-2xl">
                        <SkeletonCircle size="12" />
                        <SkeletonText mt="4" noOfLines={6} spacing="4" />
                      </div>
                    </Box>
                  );
                })}
          </div>
        )}
        <Button className={`box-shadow mt-6 ${styles.loadMoreBtn}`}>
          Load more
        </Button>
      </VStack>

      <div className="relative mt-14 flex justify-center place-content-center align-middle items-center w-full">
        <div className="max-w-[1300px] w-full relative">
          <div className="flexBetween pr-0 pl-0 mx-4 xs:mx-0 minlg:mx-8 lg:flex lg:flex-row flex-col sm:items-start">
            <h1 className=" mt-1 font-poppins dark:text-white text-nft-black-1 text-3xl minlg:text-4xl font-semibold lg:mb-0 mb-4">
              Recent Stories in the Archive 🎬
            </h1>

            <div
              onClick={() => setToggle(!toggle)}
              className="relative flexBetween lg:mt-0 lg:ml-4 ml-0 mt-2 min-w-190 cursor-pointer dark:bg-nft-black-2 bg-white box-shadow drop-shadow-md border-1 dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md"
            >
              <p className="font-poppins dark:text-white text-nft-black-1 text-sm font-medium mr-1">
                {activeSelect}
              </p>
              <Image
                src="/images/arrow.png"
                objectFit="contain"
                width={15}
                height={15}
                alt="arrow"
                className={"filter invert"}
              />

              {toggle && (
                <div className="absolute top-full left-0 right-0 w-full mt-3 z-10 dark:bg-nft-black-2 bg-white border-1 box-shadow drop-shadow-md dark:border-nft-black-2 border-nft-gray-2 py-3 px-4 rounded-md">
                  {["Recent Stories", "Top Stories", "Trending"].map((item) => (
                    <p
                      className="font-poppins dark:text-white text-nft-black-1 font-normal text-sm my-3 cursor-pointer"
                      onClick={() => setActiveSelect(item)}
                      key={item}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid p-4 lg:grid-cols-2 grid-col-1 gap-2">
            <img src="/images/media1.png" alt="media" />
            <img src="/images/media2.png" alt="media" />
            <img src="/images/media3.png" alt="media" />
            <img src="/images/media4.png" alt="media" />
          </div>

          <div className="p-4">
            <img src="/images/media5.png" alt="media" />
          </div>

          <VStack>
            <Button className={`box-shadow mt-6 ${styles.loadMoreBtn}`}>
              Load more
            </Button>
          </VStack>
        </div>
      </div>

      <div className="mt-8 md:mt-[81px] flex flex-col">
        <ReadyToBuildSection />
        <FooterSection />
      </div>
    </main>
  );
}

export default Explore;
