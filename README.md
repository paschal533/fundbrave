# FundBrave

FundBrave is a decentralized fundraising application built for fundraising organizations around the world, where users can create a fundraising campaign, Share the campaign on any social media platform, Donate to a fundraiser with a Ethereum token and print the receipt of their donations.

# 🛠 Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (NextJs & Unit Testing)
- Ethers JS (Blockchain Interaction)
- Truffle (Smart Contract Development Framework)
- IPFS (File Storage)

# ⛓ Blockchain Protocol used

- ERC-720 standard

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

- Note :- This app was deploy to Ethereum Goerli testnet, so you need to connect your Metamask wallet to  Ethereum Goerli testnet before you can Interact with the app.

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
truffle deploy --network goerli
```

Alternatively, you can deploy the Smart-contract to your local machine by running:

```
truffle deploy --network develop
```
# 📄 Smart-contract address

```
0x8E83f68672F86c4326e6B33Ae9D334cB89fe3A1C
```

# 📜 Goerli Testnet Explorer

```
https://goerli.etherscan.io/address/0x8E83f68672F86c4326e6B33Ae9D334cB89fe3A1C
```
