# FundBrave

**Project Description: FundBrave – Decentralized Funding Platform for Public Goods**

### **Introduction**

FundBrave is a decentralized fundraising and donor engagement platform built on blockchain technology, designed to empower fundraisers, donors, and communities globally. Combining the power of Web3, social media dynamics, and financial incentives, FundBrave addresses critical challenges in traditional fundraising, such as transparency, inefficiency, and centralized control.

The platform enables fundraisers to share their stories, connect with donors, and raise funds without intermediaries, ensuring that resources directly reach the intended causes. FundBrave also empowers donors by offering unique staking incentives, governance rights, and rewards, creating a mutually beneficial ecosystem.

---

### **Core Features**

1. **Decentralized Fundraising**:
    - Fundraisers can create campaigns and receive funds directly from donors without intermediaries.
    - Campaigns are hosted on an immutable blockchain, ensuring transparency and trust.
2. **Social Media-Like Interaction**:
    - Fundraisers have profile pages to share updates, stories, and media content (e.g., images and videos).
    - Users can like, comment, and share posts, fostering community engagement and boosting campaign visibility.
3. **Donor Staking Incentives**:
    - Donors can stake their tokens on fundraising campaigns and redeem them anytime.
    - Staked tokens are used for liquidity pool provisioning and lending/borrowing within the DeFi ecosystem.
    - **Profit Sharing**:
        - 80% of profits from staking activities go to the fundraiser.
        - 20% is returned to the donor, incentivizing long-term participation.
4. **Governance and Voting**:
    - Donors gain voting rights to influence proposals submitted by fundraisers they support.
    - Decentralized governance ensures accountability and enhances donor involvement.
5. **Rewards and Incentives**:
    - Donors are rewarded with badges, NFTs, gift cards, and FundBrave Tokens (FBT).
    - Recognition and incentives encourage more donations and long-term engagement.
6. **Content Verification with Numbers Protocol**:
    - Numbers Protocol ensures media authenticity by verifying images and videos uploaded to the platform.
    - This reduces the risk of fake campaigns and builds trust among donors and fundraisers.
7. **Direct Communication**:
    - A built-in chat feature allows donors and fundraisers to communicate directly, fostering stronger connections and trust.
8. **Decentralized Token Economy**:
    - FundBrave Tokens (FBT) power the ecosystem, enabling rewards, governance, and transactions.
    - FBT holders can participate in platform decisions and benefit from staking incentives.
9. **No Platform Charges**:
    - FundBrave operates as a nonprofit, eliminating fees for fundraisers and ensuring that every donation fully benefits the intended cause.

# Overview

![screenshot1](./frontend/public/images/Screenshot%20(58).png)
![screenshot1](./frontend/public/images/Screenshot%20(59).png)
![screenshot1](./frontend/public/images/Screenshot%20(60).png)
![screenshot1](./frontend/public/images/Screenshot%20(61).png)
![screenshot1](./frontend/public/images/Screenshot%20(62).png)
![screenshot1](./frontend/public/images/Screenshot%20(63).png)
![screenshot1](./frontend/public/images/Screenshot%20(64).png)

# 🛠 Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (NextJs & Unit Testing)
- Ethers JS, Wagmi, Viem (Blockchain Interaction)
- Truffle (Smart Contract Development Framework)
- IPFS (File Storage)
- Numbers Protocol (Blockchain Network)
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
