# FundBrave

**Project Description: FundBrave – Decentralized Funding Platform for Public Goods**

FundBrave is a blockchain-based platform designed to transform the funding landscape for public goods projects by connecting funders and fundraisers in a transparent, secure, and decentralized environment. Hosted on the **Filecoin blockchain** and utilizing **IPFS** for media storage, FundBrave ensures that project updates and media are verifiable, tamper-proof, and easily accessible to funders.

**Key Features**

1. **Donor-Exclusive Voting**  
   - Only verified donors can vote on project proposals, enabling funders to influence project direction and fund allocation directly.

2. **Hypercerts for Transparency**  
   - Contributions are tokenized as hypercerts, providing funders with potential financial returns or reputation credits tied to project outcomes, fostering accountability and engagement.

3. **Decentralized Identity Verification**  
   - Powered by **Zeronym** and **Silk SDKs**, FundBrave ensures that fundraiser identities are securely verified, boosting project credibility without compromising user privacy.

4. **Verifiable Media Updates**  
   - Using **Numbers Protocol** with IPFS, fundraisers can provide authenticated project updates with secure, verified media assets, allowing funders to follow project developments transparently.

5. **Cross-Platform Accessibility**  
   - Web2 social logins make it easy for all users to participate, bridging the gap between Web2 and Web3 in public goods funding.

FundBrave is designed to bring a new level of trust and engagement to public goods funding, enabling funders to support socially impactful projects while maintaining transparency and accountability at every stage.

# 🛠 Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (NextJs & Unit Testing)
- Ethers JS, Wagmi, Viem (Blockchain Interaction)
- Truffle (Smart Contract Development Framework)
- IPFS (File Storage)
- Filecoin (Blockchain Network)
- Zeronym and Silk SDK (Authentication)
- Numbers Protocol (Media assets Verification)

# ⛓ Blockchain Protocol used

- ERC-20 standard

# ⚙ Requirements For Initial Setup
- Install NodeJS, should work with any node version below 16.5.0
- Install Truffle in your terminal. You can check to see if you have truffle by running truffle --version. To install truffle `npm install -g truffle`. Ideal to have truffle version 5.3.0 to avoid dependency issues.

# 🚀 Quick Start

📄 Clone or fork FundBrave:

```
https://github.com/paschal533/fundbrave.git
```
💿 Install all dependencies:
 
```
$ cd FundBrave
$ cd frontend
$ npm install 
```

# 🎗 Add enviroment varibles

Rename the file `env.local.example` to `env.local`

Add all the required enviroment varibles in the file

```
NEXT_PUBLIC_INFURA_IPFS_PROJECT_ID =
NEXT_PUBLIC_INFURA_IPFS_PROJECT_SECRET =
NEXT_PUBLIC_FUNDRAISER_CONTRACT_ADDRESS =
NEXT_PUBLIC_INFURA_ProjectAPIKey =

```

# 🚴‍♂️ Run your App:

```
npm run dev
```

- Note :- This app was deploy to Ethereum Goerli testnet, so you need to connect your Metamask wallet to Filecoin Calibration testnet before you can Interact with the app.

# 📄 interacting with the Smart-contract

```
$ cd FundBrave
$ cd smart-contract
$ npm install
```

# 🛠 Test the Smart-contract:

```
truffle test
```

# 🎗 Compile the Smart-contract:

```
truffle compile
```

# 🔗 Deploy the Smart-contract:

- 🎗 Add enviroment varibles

Rename the file `env.example` to `env`

Add all the required enviroment varibles in the file

```
PrivateKey = 
INFURA_ProjectAPIKey = 

```

Then run

```
truffle deploy --network calibration
```

Alternatively, you can deploy the Smart-contract to your local machine by running:

```
truffle deploy --network develop
```
# 📄 Smart-contract address

```
0x92e5226E6488Cab69402b047Edd6077ebd19b66E
```

# 📜 Calibration Testnet Explorer

```
https://calibration.filscan.io/en/address/0x92e5226E6488Cab69402b047Edd6077ebd19b66E/
```
