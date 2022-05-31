// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

interface IRandOracle {
    function requestRandomNumber() external returns (uint256);
}