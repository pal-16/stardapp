// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@klaytn/contracts/KIP/token/KIP17/KIP17.sol";
import "@klaytn/contracts/KIP/token/KIP17/extensions/KIP17MetadataMintable.sol";
import "@klaytn/contracts/access/Ownable.sol";
import "@klaytn/contracts/utils/Counters.sol";


contract TaylorKlay is KIP17, Ownable {
    
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;
  uint256 public mintPrice = 1000000000000000000; // 1 KLAY.
  mapping(address => uint256) public addressToAmountMint;
  mapping(address => uint256) public addressToAmountDonate;

  mapping (uint256 => string) private _tokenURIs;

  constructor() KIP17("TaylorKlay", "TAYLORKLAY") {}

  function setMintPrice(uint256 newMintPrice) public onlyOwner {
    mintPrice = newMintPrice;
  }

  function donate() public payable {
    require(mintPrice <= msg.value, "Not enough KLAY sent.");
    addressToAmountDonate[msg.sender] += msg.value;
    payable(owner()).transfer(msg.value);
  }

  function mintNFT(string memory tokenURI) public payable {
    require(mintPrice <= msg.value, "Not enough KLAY sent.");

    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();

    payable(owner()).transfer(msg.value);
    addressToAmountMint[msg.sender] += msg.value;

    _mint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);
  }

  function _setTokenURI(uint256 tokenId, string memory uri) internal {
    require(
      _exists(tokenId),
      'KIP17Metadata: URI set of nonexistent token'
    );
    _tokenURIs[tokenId] = uri;
  }
}

