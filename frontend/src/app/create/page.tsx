"use client";
import React, { useState, useContext } from "react";
import NavBar from "@/components/common/NavBar";
import FooterSection from "@/components/sections/FooterSection";
import ReadyToBuildSection from "@/components/sections/ReadyToBuildSection";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  VStack,
  Text,
  Progress,
  HStack,
  Image,
  Input,
  Checkbox,
  Button,
  Box,
  Divider,
  Highlight,
  Textarea,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { categories } from "@/data/categories";
import { useWallet } from "@/components/login/WalletContext";
import Confetti from "react-confetti";
import { FiChevronDown } from "react-icons/fi";
import { countries } from "@/data/countries";
import styles from "@/styles/List.module.css";
import { numberWithCommas } from "@/utils/utils";
import Link from "next/link";
import { useEffect, useMemo, useCallback } from "react";
import { BsCheck } from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { ScaleFade } from "@chakra-ui/react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { FundraiserContext } from "@/context/FundraiserContext";
import Login from "@/components/login/Login";
import { AuthContext } from "@/context/AuthContext";

const projectId = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET;
const projectIdAndSecret = `${projectId}:${projectSecret}`;

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: `Basic ${Buffer.from(projectIdAndSecret).toString(
      "base64",
    )}`,
  },
});

function Create() {
  const [address, setAddress] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categorie, setCategories] = useState<any>([]);
  const [amount, setAmount] = useState<number>(0);
  const [isTxnSuccessful, setTxnSuccessful] = useState<boolean>(false);
  const [fileUrl, setFileUrl] = useState<Array<string>>([]);
  const { currentAccount } = useContext(AuthContext);
  const { createAFundraiser, isLoadingFundraiser } =
    useContext(FundraiserContext);

  const [currentStep, setCurrentStep] = useState(0);

  const uploadToInfura = async (file: any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://nft-kastle.infura-ipfs.io/ipfs/${added.path}`;

      setFileUrl((prev) => [...prev, url]);

      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  function handleAddressChange(e: any) {
    setAddress(e.target.value);
  }

  function handleAmountChange(e: any) {
    setAmount(e.target.value);
  }

  const createFundraiser = async () => {
    if (!title || !description || !address || !fileUrl) return;

    try {
      await createAFundraiser(
        title,
        fileUrl,
        categorie,
        description,
        country,
        address,
        amount,
      );
      setTxnSuccessful(true);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  if (isTxnSuccessful) {
    return (
      <VStack minH="100vh" pt="2rem" className={styles.successContainer}>
        <Confetti className="w-full h-screen" recycle={true} />
        <Text className={styles.title}>Congrats, your campaign is listed!</Text>
        <ScaleFade initialScale={0.5} in={isTxnSuccessful}>
          <Image
            alt="success image"
            src="/images/success.webp"
            className={styles.successImage}
          />
        </ScaleFade>
        <Text className={styles.successText}>
          <Text as="span" className={styles.successTextHeavy}>
            {title}
          </Text>{" "}
          has been successfully listed on FundBrave. You can edit the campaign
          anytime.
        </Text>
        <VStack className={styles.buttonContainer}>
          <Link href="/explore">
            <Button className={styles.viewCauseBtn}>View campaign</Button>
          </Link>
        </VStack>
      </VStack>
    );
  }

  if (currentStep === 4)
    return (
      <ReviewCause
        createFundraiser={createFundraiser}
        title={title}
        description={description}
        goal={amount}
        country={country}
        address={address}
        categories={categorie}
        fileUrl={fileUrl}
        setTxnSuccessful={setTxnSuccessful}
      />
    );

  function getComponent() {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            handleAddressChange={handleAddressChange}
            currentAccount={currentAccount}
            connectWallet={Login}
            handleAmountChange={handleAmountChange}
            address={address}
            amount={amount}
            setCurrentStep={setCurrentStep}
          />
        );

      case 1:
        return (
          <StepTwo
            setCategories={setCategories}
            setCountry={setCountry}
            setTitle={setTitle}
            setCurrentStep={setCurrentStep}
          />
        );
      case 2:
        return (
          <StepThree
            setDescription={setDescription}
            setCurrentStep={setCurrentStep}
          />
        );
      case 3:
        return (
          <StepFour
            uploadToInfura={uploadToInfura}
            setCurrentStep={setCurrentStep}
          />
        );
    }
  }

  return (
    <main className="">
      <NavBar name="browse" />

      <div className="lg:pt-20 pt-6">
        <VStack
          minH="100vh"
          className="pt-[2rem] pb-[2rem] pl-[4rem] pr-[4rem] sm:pt-[2rem] sm:pb-[2rem] sm:pl-[0px] sm:pr-[0px]"
        >
          <Text className={styles.title}>Create a new Campaign</Text>

          <VStack className={styles.progressContainer}>
            <Box className="relative lg:w-[550px] w-full h-[5px] bg-[#bfb9b9] rounded-[5px]">
              <Box
                style={{
                  backgroundColor: "black",
                  width: `${(((currentStep + 1) / 4) * 100).toFixed(0)}%`,
                }}
                className={`${styles.progressBar}`}
              ></Box>
              <HStack className={styles.progressBarDividers}>
                <Box pl="6px">
                  <Box className={styles.progressBarDivider}></Box>
                </Box>
                <Box className={styles.progressBarDivider}></Box>
                <Box pr="7px">
                  <Box className={styles.progressBarDivider}></Box>
                </Box>
              </HStack>
            </Box>
          </VStack>
          {getComponent()}
        </VStack>
      </div>

      <div className="mt-8 md:mt-[81px] flex flex-col">
        <ReadyToBuildSection />
        <FooterSection />
      </div>
    </main>
  );
}

type StepOneProps = {
  handleAddressChange: (e: any) => void;
  handleAmountChange: (e: any) => void;
  amount: number;
  address: string;
  setCurrentStep: (step: any) => void;
  currentAccount: string;
  connectWallet: (width: any) => void;
};

function StepOne({
  handleAddressChange,
  handleAmountChange,
  amount,
  address,
  setCurrentStep,
  currentAccount,
  connectWallet,
}: StepOneProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Default Network</Text>
          <HStack className="lg:w-[550px] w-full h-[75px] p-[1rem] rounded-[15px] border-[2px] border-black">
            <Image
              alt="Fil logo"
              src="/images/fil.png"
              className={styles.klaytnLogo}
            ></Image>
            <Text fontWeight={600}>Filecoin</Text>
          </HStack>
        </VStack>
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Currency</Text>
          <HStack className="lg:w-[550px] w-full h-[75px] p-[1rem] rounded-[15px] border-[2px] border-black">
            <Image
              alt="fil logo"
              src="/images/fil.png"
              className={styles.klaytnLogo}
            ></Image>
            <Text fontWeight={600}>FIL</Text>
          </HStack>
        </VStack>
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Enter your campaign goal</Text>
          <Input
            type="number"
            onChange={handleAmountChange}
            className={styles.input}
          ></Input>
          <Text className={styles.inputUnit}>USD</Text>
        </VStack>
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Recipient Address</Text>
          <Input
            onChange={handleAddressChange}
            className={styles.input}
          ></Input>
        </VStack>
      </VStack>
      {currentAccount ? (
        <Button
          disabled={!amount || !address}
          className={styles.donateBtn}
          onClick={() => setCurrentStep((prev: any) => prev + 1)}
        >
          Next
        </Button>
      ) : (
        <Login width="lg:!w-[550px]!w-[350px] !py-4 !rounded-2xl"/>
      )}
    </VStack>
  );
}

type StepTwoProps = {
  setCategories: (cat: any) => void;
  setCountry: (country: any) => void;
  setTitle: (title: any) => void;
  setCurrentStep: (step: any) => void;
};

function StepTwo({
  setCategories,
  setCountry,
  setTitle,
  setCurrentStep,
}: StepTwoProps) {
  const [open, setOpen] = useState<string>("");
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [name, setname] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  function handleSelectCategories(category: string) {
    const copiedCategories = { ...selectedCategories };
    //@ts-ignore
    if (selectedCategories[category]) {
      //@ts-ignore
      delete copiedCategories[category];
    } else {
      //@ts-ignore
      copiedCategories[category] = true;
    }
    setSelectedCategories(copiedCategories);
    setCategories(Object.keys(copiedCategories));
  }

  function handleCountryChange(country: any) {
    setSelectedCountry(country);
    setCountry(country);
    setCountriesVisible(false);
  }

  function handleTitleChange(e: any) {
    setTitle(e.target.value);
    setname(e.target.value);
  }

  const isValidForm =
    name && selectedCountry && Object.keys(selectedCategories).length > 0;

  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Campaign title</Text>
          <Input onChange={handleTitleChange} className={styles.input}></Input>
        </VStack>
        <VStack className={`${styles.inputContainer} w-full`}>
          <Text className={styles.inputHeader}>Choose categories</Text>
          <div className="lg:w-[550px] w-full">
            <div
              className={`select-btn ${open}`}
              onClick={() => (open === "" ? setOpen("open") : setOpen(""))}
            >
              {Object.keys(selectedCategories).length === 0 ? (
                <>
                  <span className="btn-text font-bold">Select categories</span>
                  <span className="arrow-dwn text-white font-bold">
                    <FiChevronDown className="text-white" />
                  </span>
                </>
              ) : (
                <>
                  <span className="btn-text font-bold">
                    {Object.keys(selectedCategories).length} Selected
                  </span>
                  <span className="arrow-dwn text-white font-bold">
                    <FiChevronDown className="text-white" />
                  </span>
                </>
              )}
            </div>

            <ul className="list-items">
              {categories.map((category, idx) => (
                <li
                  className={`item ${Object.keys(selectedCategories).includes(category) ? "checked" : ""}`}
                  key={idx}
                  onClick={() => handleSelectCategories(category)}
                >
                  <span className="checkbox text-white">
                    <BsCheck />
                  </span>
                  <span className="item-text">{category}</span>
                </li>
              ))}
            </ul>
          </div>
        </VStack>
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Where are you based?</Text>
          <HStack
            className={styles.selectBox}
            onClick={() => setCountriesVisible(!isCountriesVisible)}
          >
            {selectedCountry ? (
              <Text fontWeight={500}>{selectedCountry}</Text>
            ) : (
              <Text fontWeight={500}>Select country</Text>
            )}
            <ChevronDownIcon className={styles.chevronIcon} />
          </HStack>
          {isCountriesVisible && (
            <VStack className={styles.selectionContainer}>
              {countries.map((cite, idx) => (
                <VStack key={idx} onClick={() => handleCountryChange(cite)}>
                  <HStack className={styles.countriesBox}>
                    <Text className={styles.checkboxTitle}>{cite}</Text>
                  </HStack>
                  <Divider></Divider>
                </VStack>
              ))}
            </VStack>
          )}
        </VStack>
      </VStack>
      <Button
        disabled={!isValidForm}
        className={styles.donateBtn}
        onClick={() => setCurrentStep((prev: any) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepThreeProps = {
  setCurrentStep: (step: any) => void;
  setDescription: (desc: any) => void;
};

function StepThree({ setCurrentStep, setDescription }: StepThreeProps) {
  const [text, setText] = useState();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  function handleTextChange(e: any) {
    setText(e.target.value);
    setDescription(e.target.value);
  }

  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Description</Text>
          <Textarea
            onChange={(e) => handleTextChange(e)}
            className={styles.textarea}
          ></Textarea>
          <Text className={styles.inputDescription}>
            This text will show up in the “About” section of your campaign
            detail page.
          </Text>
        </VStack>
      </VStack>
      <Button
        className={styles.donateBtn}
        disabled={!text}
        onClick={() => setCurrentStep((prev: any) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepFourProps = {
  uploadToInfura: (files: any) => void;
  setCurrentStep: (step: any) => void;
};

function StepFour({ uploadToInfura, setCurrentStep }: StepFourProps) {
  const [files, setFiles] = useState<any[]>([]);

  const onDrop = useCallback(
    async (acceptedFile: any) => {
      const res = await uploadToInfura(acceptedFile[0]);
      setFiles((prev) => [...prev, res]);
    },
    [uploadToInfura],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    // @ts-ignore TODO: fix typescript error
    accept: "image/*",
    maxSize: 5000000,
  });

  // add tailwind classes acording to the file status
  const fileStyle = useMemo(
    () =>
      `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed  
         ${isDragActive ? " border-file-active " : ""} 
         ${isDragAccept ? " border-file-accept " : ""} 
         ${isDragReject ? " border-file-reject " : ""}`,
    [isDragActive, isDragReject, isDragAccept],
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const removeItem = (file: string) => {
    const index = files.indexOf(file);
    if (index > -1) {
      // only splice array when item is found
      files.splice(index, 1); // 2nd parameter means remove one item only
    }
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <VStack className="p-4">
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Add images</Text>

          <div className="mt-4">
            <div {...getRootProps()} className={fileStyle}>
              <input {...getInputProps()} />
              <div className="flexCenter flex-col text-center">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl">
                  JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.
                </p>

                <div className="my-12 w-full flex justify-center">
                  <Image
                    src="/images/upload.png"
                    alt="file upload"
                    className={"filter invert"}
                  />
                </div>

                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                  Drag and Drop File
                </p>
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                  Or browse media on your device
                </p>
              </div>
            </div>
          </div>
          <Text className={styles.inputDescription}>
            Select 3 images to showcase your campaign.
          </Text>
          <div className="flex flex-wrap space-x-0 lg:space-x-2 justify-center items-center w-full">
            {files.slice(0, 3).map((file) => (
              <VStack key={file} className={styles.previewImageContainer}>
                <VStack className={styles.closeBtn}>
                  <CloseIcon
                    w={3}
                    h={3}
                    onClick={() => removeItem(file)}
                    className="cursor-pointer"
                  />
                </VStack>
                <Image
                  alt="uploaded file"
                  src={file ?? ""}
                  className={styles.previewImage}
                />
              </VStack>
            ))}
          </div>
        </VStack>
      </VStack>
      <Button
        disabled={files.length < 3}
        className={styles.donateBtn}
        onClick={() => setCurrentStep((prev: any) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type ReviewCauseProps = {
  title: string;
  description: string;
  goal: number;
  country: string;
  address: string;
  categories: Array<string>;
  fileUrl: Array<string>;
  setTxnSuccessful: (bool: boolean) => void;
  createFundraiser: () => void;
};

function ReviewCause({
  createFundraiser,
  title,
  description,
  goal,
  country,
  address,
  categories,
  fileUrl,
  setTxnSuccessful,
}: ReviewCauseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  async function handleListCause() {
    setIsLoading(true);
    await createFundraiser();
    setTimeout(() => {
      scrollToTop();
      setTxnSuccessful(true);
      setIsLoading(false);
    }, 3000);
  }

  return (
    <VStack minH="100vh" p="2rem 4rem 3rem 4rem">
      <VStack>
        <Text className={styles.title}>Review your campaign</Text>
        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Your campaign</Text>
          <Image
            alt="check logo"
            src="/images/chec.png"
            className={styles.checkLogo}
          ></Image>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Default Network</Text>
          <HStack>
            <Image
              alt="fil logo"
              src="/images/fil.png"
              className={styles.klaytnLogo}
            ></Image>
            <Text fontWeight={500}>Filecoin</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Currency</Text>
          <HStack>
            <Image
              alt="fil logo"
              src="/images/fil.png"
              className={styles.klaytnLogo}
            ></Image>
            <Text fontWeight={500}>FIL</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Campaign goal</Text>
          <Text fontWeight={500}>{numberWithCommas(goal)} USD</Text>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Campaign Info</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Campaign title</Text>
          <HStack>
            <Text fontWeight={500}>{title}</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Chosen categories</Text>
          <HStack className={styles.tagContainer}>
            {categories.map((tag, idx) => (
              <Text key={idx} className={styles.causeTag}>
                {tag}
              </Text>
            ))}
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Location</Text>
          <Text fontWeight={500}>{country}</Text>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Description</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>About</Text>
          <VStack>
            <Text
              fontWeight={500}
              className="w-[340px] lg:w-[600px]"
              pb={"1rem"}
            >
              {description}
            </Text>
          </VStack>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Cover image</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>3 images uploaded</Text>
          <SimpleGrid columns={3} gap={3}>
            {fileUrl.map((file) => (
              <VStack key={file} className={styles.previewImageContainer}>
                {file}
                <Image
                  alt="uploaded file"
                  src={file ?? ""}
                  className={styles.previewImage}
                />
              </VStack>
            ))}
          </SimpleGrid>
          <Divider />
        </VStack>

        <Button
          disabled={false}
          className={styles.donateBtn}
          onClick={handleListCause}
        >
          {isLoading ? <Spinner color="white" /> : "List campaign"}
        </Button>
      </VStack>
    </VStack>
  );
}

export default Create;
