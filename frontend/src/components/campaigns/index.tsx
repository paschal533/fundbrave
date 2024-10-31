import { useContext, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { ProfileContext } from "@/context/ProfileContext";
import { Button } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  VStack,
  Text,
  Input,
  Textarea
} from "@chakra-ui/react";
import styles from "@/styles/List.module.css";
import { create as ipfsHttpClient } from "ipfs-http-client";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image
} from "@chakra-ui/react";


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

const UserCampaigns = () => {
  const { isLoadingUserCampaigns, UserCampaigns, setNewBeneficiary, withdraw, addMediaArchive, createProposal } =
    useContext(ProfileContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [beneficiary, setBeneficiary] = useState("");
  const [address, setAddress] = useState("");
  const [modalType, setModalType] = useState("");
  const [proposalTitle, setProposalTitle] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  

  function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  const uploadToInfura = async (file: any) => {
    try {
      const added = await client.add({ content: file });

      const url = `https://nft-kastle.infura-ipfs.io/ipfs/${added.path}`;

      setMediaUrl(url);

      return url;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  };

  function handleChange(e : any) {
    uploadToInfura(e.target.files[0]);
  }

  const openModal = (address: string, type: string) => {
    setAddress(address);
    setModalType(type);
    onOpen();
  };

  return (
    <div className="!overflow-x-hidden w-full">
      <TableContainer className="mt-8 items-center text-center justify-center bg-white rounded-md w-full">
        <Table variant="simple">
          <Thead className="font-bold text-2xl">
            {!isLoadingUserCampaigns ? (
              UserCampaigns?.length > 0 ? (
                <Tr>
                  <Th className="text-lg font-semibold">Campaign name</Th>
                  <Th className="text-lg font-semibold">Amount donated</Th>
                  <Th className="text-lg font-semibold">Change beneficiary</Th>
                  <Th className="text-lg font-semibold">Withdraw</Th>
                  <Th className="text-lg font-semibold">Proposal</Th>
                  <Th className="text-lg font-semibold">Media Archive</Th>
                </Tr>
              ) : (
                <Th className="text-lg font-semibold">No record</Th>
              )
            ) : (
              <Th className="text-lg font-semibold">Fetching assets</Th>
            )}
          </Thead>
          {!isLoadingUserCampaigns ? (
            UserCampaigns?.length > 0 ? (
              <Tbody className="w-full items-center space-y-4 text-center justify-center">
                {UserCampaigns?.map((asset: any, index: any) => {
                  return (
                    <Tr className="mt-8" key={index}>
                      <Td className="text-md font-semibold">{asset.name}</Td>
                      <Td className="text-md font-semibold">
                        {asset.dollarDonationAmount.toFixed(2)} USD
                      </Td>
                      <Td>
                        <Button
                          colorScheme="teal"
                          onClick={() => openModal(asset.address, "beneficiary")}
                        >
                          Set Beneficiary
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          onClick={() => withdraw(asset.address)}
                          colorScheme="blue"
                        >
                          Withdraw
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="purple"
                          onClick={() => openModal(asset.address, "proposal")}
                        >
                           Proposal
                        </Button>
                      </Td>
                      <Td>
                        <Button
                          colorScheme="orange"
                          onClick={() => openModal(asset.address, "media")}
                        >
                           Update Media
                        </Button>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            ) : (
              <div className="text-center h-[100px] w-full">
                <p className="text-lg font-semibold">
                  No Active campaign record Found.
                </p>
              </div>
            )
          ) : (
            <Spinner />
          )}
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          {(() => { switch(modalType){
            case "beneficiary":
              return (
                <>
                <ModalHeader>Set a new beneficiary</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <div className="flex-row w-full px-4 py-3 mt-4 text-base bg-white border rounded-lg outline-none dark:bg-nft-black-1 dark:border-nft-black-1 border-nft-gray-2 font-poppins dark:text-white text-nft-gray-2 flexBetween">
                      <input
                        title="Change beneficiary"
                        type="text"
                        placeholder="Change beneficiary"
                        className="flex-1 w-full bg-white outline-none dark:bg-nft-black-1 "
                        onChange={(e) => setBeneficiary(e.target.value)}
                      />
                    </div>
                  </ModalBody>

                  <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      disabled={beneficiary.length < 42}
                      colorScheme="blue"
                      onClick={() => setNewBeneficiary(address, beneficiary)}
                    >
                      Set beneficiary
                    </Button>
                  </ModalFooter>
                  </>
              )
              break;
            case "proposal":
              return(
              <div>
                  <ModalHeader>Create a new Proposal</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <VStack pb="2rem">
                  <VStack className={styles.inputContainer}>
                    <Text className={styles.inputHeader}>Proposal title</Text>
                    <Input value={proposalTitle} onChange={(e : any) => setProposalTitle(e.target.value)} className={styles.inputProposal}></Input>
                  </VStack>
                  <VStack className={styles.inputContainerProposal}>
                    <Text className={styles.inputHeader}>Description</Text>
                    <Textarea
                      value={proposalDescription}
                      onChange={(e : any) => setProposalDescription(e.target.value)}
                      className={styles.textareaProposal}
                    ></Textarea>
                    <Text className={styles.inputDescriptionProposal}>
                      This text will show up in the “About” section of your proposal.
                    </Text>
                  </VStack>
                  </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      disabled={!proposalDescription || !proposalTitle}
                      colorScheme="blue"
                      onClick={async () => { await createProposal(address, proposalTitle, proposalDescription); setProposalTitle(""); setProposalDescription("");}}
                    >
                       Create Proposal
                    </Button>
                  </ModalFooter>
              </div>
            )
              break;
            default:
              return (<div>
                <ModalHeader>Add to Media Archive </ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <VStack pb="2rem">
                  <VStack className={styles.inputContainer}>
                    <Text className={styles.inputHeader}>Media title</Text>
                    <Input value={mediaTitle} onChange={(e : any) => setMediaTitle(e.target.value)} className={styles.inputProposal}></Input>
                  </VStack>
                  <VStack className={styles.inputContainerProposal}>
                    <Text className={styles.inputHeader}>Description</Text>
                    <Textarea
                      value={mediaDescription}
                      onChange={(e : any) => setMediaDescription(e.target.value)}
                      className={styles.textareaProposal}
                    ></Textarea>
                    <Text className={styles.inputDescriptionProposal}>
                      This text will show up in the “About” section of your media archive.
                    </Text>
                  </VStack>
                  <div className="">
                    <div className="w-full flex flex-col">
                      <h2>Add Image:</h2>
                      <input type="file" onChange={handleChange} accept="image/png, image/jpeg" />
                    </div>
                    {mediaUrl && <Image width={100} className="mt-2 rounded-md justify-center items-center w-full" height={100} src={mediaUrl} alt="uploaded" />}
                  </div>
                  </VStack>
                  </ModalBody>
                  <ModalFooter>
                    <Button variant="ghost" mr={3} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      disabled={!mediaTitle || !mediaDescription || !mediaUrl}
                      colorScheme="blue"
                      onClick={async () => {await addMediaArchive(address, mediaTitle, mediaDescription, mediaUrl); setMediaTitle(""); setMediaDescription(""); setMediaUrl("");}}
                    >
                      Add Media
                    </Button>
                  </ModalFooter>
              </div>)
          }
          })()}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserCampaigns;
