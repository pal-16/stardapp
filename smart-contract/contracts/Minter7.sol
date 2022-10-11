// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Minter7 is ERC721, ERC721URIStorage, ERC721Enumerable, Ownable {
  using Counters for Counters.Counter;

  Counters.Counter private _tokenIdCounter;
  uint256 public mintPrice = 1000000000000000000; // 1 CET.
  mapping(address => uint256) public addressToAmountMint;
  mapping(address => uint256) public addressToAmountDonate;

  constructor() ERC721("Minter7", "MINTER7") {}

  function setMintPrice(uint256 newMintPrice) public onlyOwner {
    mintPrice = newMintPrice;
  }

  function donate() public payable {
    payable(owner()).transfer(msg.value);
    addressToAmountDonate[msg.sender] += msg.value;
  }

  function mint(string memory tokenURI) public payable {
    require(mintPrice <= msg.value, "Not enough CET sent.");

    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();

    payable(owner()).transfer(msg.value);
    addressToAmountMint[msg.sender] += msg.value;
    _safeMint(msg.sender, tokenId);
    _setTokenURI(tokenId, tokenURI);
  }

  function mintTo(address to, string memory tokenURI) public onlyOwner {
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();

    _safeMint(to, tokenId);
    _setTokenURI(tokenId, tokenURI);
  }
  
  function send(address to, uint256 tokenId) public {
    require(msg.sender == ownerOf(tokenId), 'Not owner of this token');

    safeTransferFrom(msg.sender, to, tokenId);
  }

  // Overrides.

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    super._burn(tokenId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
      return super.tokenURI(tokenId);
  }
  
  function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal override(ERC721, ERC721Enumerable) {
      return super._beforeTokenTransfer(from, to, tokenId);
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
      return super.supportsInterface(interfaceId);
  }
}