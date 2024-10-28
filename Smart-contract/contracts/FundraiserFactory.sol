// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Fundraiser.sol";

contract FundraiserFactory {
  Fundraiser[] private _fundraisers;

  event FundraiserCreated(Fundraiser indexed fundraiser, address indexed owner);

  uint256 constant maxLimit = 20;

  uint256 public currentId;

  function createFundraiser(
    string memory name,
    string[] memory images,
    string[] memory categories,
    string memory description,
    string memory region,
    address payable beneficiary,
    uint256 goal
  )
  public
  {
    Fundraiser fundraiser = new Fundraiser(
      currentId,
      name,
      images,
      categories,
      description,
      region,
      beneficiary,
      msg.sender,
      goal
    );
    _fundraisers.push(fundraiser);
    currentId += 1;
    emit FundraiserCreated(fundraiser, msg.sender);
  }

  // Query the number of fundrisers in our smart contract
  function fundraisersCount() public view returns(uint256) {
    return _fundraisers.length;
  }

  // Query all fundraisers in our smart contract
  function fundraisers(uint256 limit, uint256 offset) 
    public 
    view
    returns(Fundraiser[] memory coll)
  {
    require(offset <= fundraisersCount(), "offset out of bounds");
    uint256 size = fundraisersCount() - offset;
    // size should not exceed the maxLimit
    size = size < limit ? size : limit;
    size = size < maxLimit ? size : maxLimit;
    coll = new Fundraiser[](size);

    for(uint256 i = 0; i < size; i++) {
      coll[i] = _fundraisers[offset + i];
    }
    
    return coll;
  }
}