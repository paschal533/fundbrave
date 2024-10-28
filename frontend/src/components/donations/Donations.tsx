import { useContext } from "react";
import Link from "next/link";
import { Spinner } from "@chakra-ui/react";
import { ProfileContext } from "@/context/ProfileContext";
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
import { Button } from "@chakra-ui/react";

const Donations = () => {
  const { totalDonations, isLoadingUserDonations, myDonations, currentAccount } =
    useContext(ProfileContext);

  function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day} ${year}`;
  }

  return (
    <TableContainer className="mt-8 items-center text-center justify-center bg-white rounded-md w-full">
      <Table variant="simple">
        <Thead className="font-bold text-2xl">
          {!isLoadingUserDonations ? (
            myDonations?.length > 0 ? (
              <Tr>
                <Th className="text-lg font-semibold">Campaign name</Th>
                <Th className="text-lg font-semibold">Amount donated</Th>
                <Th className="text-lg font-semibold">Date of donation</Th>
                <Th className="text-lg font-semibold">Request receipt</Th>
              </Tr>
            ) : (
              <Th className="text-lg font-semibold">No record</Th>
            )
          ) : (
            <Th className="text-3xl font-bold">Fetching assets</Th>
          )}
        </Thead>
        {!isLoadingUserDonations ? (
          myDonations?.length > 0 ? (
            <Tbody className="w-full items-center space-y-4 text-center justify-center">
              {myDonations?.map((asset: any, index : any) => {
                return (
                  <Tr key={index} className="mt-8">
                    <Td className="text-md font-semibold">{asset.name}</Td>
                    <Td className="text-md font-semibold">
                      {asset.donationAmount} USD
                    </Td>
                    <Td className="text-md font-semibold">
                      {getFormattedDate(Number(asset.date))}
                    </Td>
                    <Td>
                      <Link
                        href={{
                          pathname: "/receipts",
                          query: {
                            fundraiser: asset.name,
                            donation: asset.donationAmount,
                            date: asset.date,
                          },
                        }}
                      >
                        <Button colorScheme="blue">Request receipt</Button>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          ) : (
            <div className="text-center h-[100px] w-full">
              <p className="text-lg font-semibold">
                No Donation record Found. Make some donations first
              </p>
            </div>
          )
        ) : (
          <Spinner />
        )}
      </Table>
    </TableContainer>
  );
};

export default Donations;
