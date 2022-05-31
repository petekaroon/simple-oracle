// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface ICaller {
    function fulfillRandomNumberRequest(uint256 randomNumber, uint256 id) external;
}