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
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

const UserCampaigns = () => {
  const { isLoadingUserCampaigns, UserCampaigns, setNewBeneficiary, withdraw, currentAccount } =
    useContext(ProfileContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [beneficiary, setBeneficiary] = useState("");
  const [address, setAddress] = useState("");

  function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  const openModal = (address: string) => {
    setAddress(address);
    onOpen();
  };

  return (
    <div>
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
                          onClick={() => openModal(asset.address)}
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
        </ModalContent>
      </Modal>
    </div>
  );
};

export default UserCampaigns;
