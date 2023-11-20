# ETHFrontEnd

# Description
This project demonstrates the usage of a Front-end or a webpage using JS and doing transactions using Solidity. The project is made from Gitpod, which uses a virtual VSCode editor. The project consists of 4 types of transactions: Deposit / Withdraw 1 ETH and Mint / Burn 5 ETH. The project was done in order to show the capabilities of Smart Contracts in our front-ends. This project is from a forked repository that is the starter repository from Metacrafter's Chris. You can check it here: https://github.com/MetacrafterChris/SCM-Starter

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
Assessment.sol:
```
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Mint(uint256 amount);
    event Burn(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    function mint(uint256 _mintvalue) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _mintvalue;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _mintvalue);

        // emit the event
        emit Mint(_mintvalue);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }

    // custom error
    error CannotBurn(uint256 balance, uint256 burnvalue);

    function burn(uint256 _burnvalue) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _burnvalue) {
            revert CannotBurn({
                balance: balance,
                burnvalue: _burnvalue
            });
        }

        // burn the given amount
        balance -= _burnvalue;

        // assert the balance is correct
        assert(balance == (_previousBalance - _burnvalue));

        // emit the event
        emit Burn(_burnvalue);
    }
}
```

Index.js
```
import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const mint = async() => {
    if (atm) {
      let tx = await atm.mint(5);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  const burn = async() => {
    if (atm) {
      let tx = await atm.burn(5);
      await tx.wait()
      getBalance();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={mint}>Mint 5 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={burn}>Burn 5 ETH</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
```

Deploy.js:
```

