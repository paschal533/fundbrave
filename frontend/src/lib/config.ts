import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    // add desired networks here
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
