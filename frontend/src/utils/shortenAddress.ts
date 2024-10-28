import { Address } from "@/types";

export const shortenAddress = (address: Address) =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;
