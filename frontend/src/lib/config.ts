import { http, createConfig } from "wagmi";
import { mainnet, sepolia, filecoinCalibration } from "wagmi/chains";

export const config = createConfig({
  chains: [filecoinCalibration],
  transports: {
    // add desired networks here
    [filecoinCalibration.id]: http(),
  },
});
