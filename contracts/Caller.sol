// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./IRandOracle.sol";

contract Caller is Ownable {
    IRandOracle public randOracle;

    mapping(uint256 => bool) requests;
    mapping(uint256 => uint256) results;

    modifier onlyRandOracle() {
        require(msg.sender == address(randOracle), "Unauthorized.");
        _;
    }

    event OracleAddressChanged(address oracleAddress);
    event RandomNumberRequested(uint256 id);
    event RandomNumberReceived(uint256 number, uint256 id);

    constructor() {}

    function setRandOracleAddress(address newAddress) external onlyOwner {
        randOracle = IRandOracle(newAddress);

        emit OracleAddressChanged(newAddress);
    }

    function getRandomNumber() external {
        require(randOracle != IRandOracle(address(0)), "Oracle not initialized.");

        uint256 id = randOracle.requestRandomNumber();
        requests[id] = true;

        emit RandomNumberRequested(id);
    }

    function fulfillRandomNumberRequest(uint256 randomNumber, uint256 id) external onlyRandOracle {
        require(requests[id], "Request is invalid or already fulfilled.");

        results[id] = randomNumber;
        delete requests[id];

        emit RandomNumberReceived(randomNumber, id);
    }
}