# ETHFrontEnd

# Description
This project demonstrates the usage of a Front-end or a webpage using JS and doing transactions using Solidity. The project is made from Gitpod, which uses a virtual VSCode editor. The project consists of 4 types of transactions: Deposit / Withdraw 1 ETH and Mint / Burn 5 ETH. The project was done in order to show the capabilities of Smart Contracts in our front-ends.

# Index.js
This file is used to run the project's webpage. Here we have the showing of the account's address as well as its balance. There are 4 buttons, namely Deposit / Withdraw 1 ETH and Mint / Burn 5 ETH. Deposit and Withdraw uses 1 ETH to be deposited or withdrawn while Mint and Burn uses 5 ETH to be minted and burned.

# Assessment.sol
This file contains the functions from Solidity to be used for the webpage. The functions deposit, withdraw, mint, and burn checks if the current connected account is the owner's account. Otherwise, it returns an error indicating that the connected account is not the owner's, which was given during the setup of the front-end. In addition, the functions withdraw and burn, when used on an empty balance, returns an error indicating that the account's balance is insufficient for withdrawing / burning.

# Deploy.js
This file is used to deploy the network of the project in the localhost.

# Steps-to-do
After forking the repository, do the following:
1. Create 2 more terminals.
2. In the first terminal, type npm i or npm install.
3. In the second terminal type npx hardhat node to get your network link for your local host.
4. In the third terminal, type npx hardhat run --network localhost scripts/deploy.js. Not adding --network localhost would result the deployment occuring in the machine's network, not the localhost.
5. In the first terminal, type npm run dev. The webpage should open in http://localhost-3000/
6. Set up your network in Metamask with the network link and chain ID, your chain ID should be given upon entering the link. Afterwards, change the symbol to ETH.
7. Get the private key of the first account given from Step 2. In Metamask, import the account using the private key.
8. If you have other accounts in your Metamask, disconnect them to not let the webpage be confused.
9. Connect your Metamask account in the webpage.
10. You can now do transactions!

For Gitpod users:
Before connecting your account in Metamask, set up a network using the Ports tab within the window that houses the Terminal. Pick the 8545 link and copy it. That will be used for the network link. This link changes everytime you refresh the project so copy the link everytime.

# Source Code
```
