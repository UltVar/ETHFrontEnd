// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;
    string public Item1 = "MonkeySaurus NFT";
    string public Item2 = "DDMonkey NFT";
    string public Item3 = "PlaceboMonkey NFT";
    uint8 public tokenbalance = 0;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event Mint(uint256 amount);
    event Burn(uint256 amount);
    event NFT1(uint256 amount);
    event NFT2(uint256 amount);
    event NFT3(uint256 amount);

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

    function nft1(uint256 _buyvalue) public{
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _buyvalue) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _buyvalue
            });
        }

        balance -= _buyvalue;

        assert(balance == (_previousBalance - _buyvalue));

        emit NFT1(_buyvalue);
    }

    function getNFT1() public view returns(string memory){
        return Item1;
    }

    function nft2(uint256 _buyvalue) public{
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _buyvalue) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _buyvalue
            });
        }

        balance -= _buyvalue;

        assert(balance == (_previousBalance - _buyvalue));

        emit NFT2(_buyvalue);
    }

    function getNFT2() public view returns(string memory){
        return Item2;
    }

    function nft3(uint256 _buyvalue) public{
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _buyvalue) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _buyvalue
            });
        }

        balance -= _buyvalue;

        assert(balance == (_previousBalance - _buyvalue));

        emit NFT3(_buyvalue);
    }

    function getNFT3() public view returns(string memory){
        return Item3;
    }
}
