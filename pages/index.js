import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [nft1, setNFT1] = useState(undefined);
  const [nft2, setNFT2] = useState(undefined);
  const [nft3, setNFT3] = useState(undefined);

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

  const getNFT1 = async() =>{
    if (atm) {
      setNFT1((await atm.getNFT1()));
    }
  }

  const getNFT2 = async() =>{
    if (atm) {
      setNFT2((await atm.getNFT2()));
    }
  }

  const getNFT3 = async() =>{
    if (atm) {
      setNFT3((await atm.getNFT3()));
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

  const NFT1 = async() =>{
    if (atm){
      let tx = await atm.nft1(1);
      await tx.wait()
      getBalance();
    }
  }

  const NFT2 = async() =>{
    if (atm){
      let tx = await atm.nft2(5);
      await tx.wait()
      getBalance();
    }
  }

  const NFT3 = async() =>{
    if (atm){
      let tx = await atm.nft3(10);
      await tx.wait()
      getBalance();
    }
  }

  const tokens = async() =>{
    if (atm){
      let tx = await atm.tokens(10);
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

    if (nft1 == undefined){
      getNFT1();
    }

    if (nft2 == undefined){
      getNFT2();
    }

    if (nft3 == undefined){
      getNFT3();
    }

    return (
      <div>
        <p>NFTs Available: </p>
        <p>MonkeySaurus , DDMonkey, PlaceboMonkey</p>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>1 ETH: {nft1}</p>
        <p>5 ETH: {nft2}</p>
        <p>10 ETH: {nft3}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={mint}>Mint 5 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={burn}>Burn 5 ETH</button>
        <button id = "0" onClick={NFT1}>Buy MonkeySaurus NFT</button>
        <button id = "1" onClick={NFT2}>Buy DDMonkey NFT</button>
        <button id = "2" onClick={NFT3}>Buy PlaceboMonkey NFT</button>
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
