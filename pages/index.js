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
      let tx = await atm.tokens(1);
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

  function Add2NFT1() {
    var x = document.getElementById("0").value
    document.getElementById("NFT1").innerHTML = x;
  }

  function Add2NFT2() {
    var x = document.getElementById("1").value
    document.getElementById("NFT2").innerHTML = x;
  }

  function Add2NFT3() {
    var x = document.getElementById("2").value
    document.getElementById("NFT3").innerHTML = x;
  }

  function Add2Tokens() {
    var x = document.getElementById("3").value
    document.getElementById("Tokens").innerHTML = x;
  }

  function multclicks1(){
    Add2NFT1();
    {NFT1};
  }

  function multclicks2(){
    Add2NFT2();
    {NFT1};
  }

  function multclicks3(){
    Add2NFT3();
    {NFT2};
  }

  function multclicks4(){
    Add2tokens();
    {tokens};
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
        <p>NFTs Available: </p>
        <p>MonkeySaurus , DDMonkey, PlaceboMonkey</p>
        <p>Prices: 1 ETH, 5 ETH, 10 ETH</p>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <p>NFT 1: <p id= "NFT1"></p></p>
        <p>NFT 2: <p id= "NFT2"></p></p>
        <p>NFT 3: <p id= "NFT3"></p></p>
        <p>Your MM Tokens: <p id= "Tokens"></p></p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={mint}>Mint 5 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <button onClick={burn}>Burn 5 ETH</button>
        <button id = "0" onClick="multclicks1()" value="MonkeySaurus">Buy MonkeySaurus NFT</button>
        <button id = "1" onClick="multclicks2()" value="DDMonkey">Buy DDMonkey NFT</button>
        <button id = "2" onClick="multclicks3()" value="PlaceboMonkey">Buy PlaceboMonkey NFT</button>
        <button id = "3" onClick="multclicks4()" value = {tokens}>Add 10 MM Tokens</button>
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
