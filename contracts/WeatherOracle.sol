// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

contract WeatherOracle {
    // jobId => jobStatus
    mapping (uint => bool) public jobStatus;

    // jobId => temperature result
    mapping (uint => uint) public jobResult;

    // timestamp of last updated temperatur result
    uint public lastUpdate;

    // current jobId available
    uint jobId;

    // event to trigger Oracle API
    event NewJob(uint lat, uint lon, uint jobId);

    constructor(uint initialId) {
        jobId = initialId;
    }

    function getWeather(uint lat, uint lon) public {
        emit NewJob(lat, lon, jobId);
        jobId++;
    }

    function updateWeather(uint temperature, uint _jobId) public {
        jobResult[_jobId] = temperature;
        lastUpdate = block.timestamp;
        jobStatus[_jobId] = true;
    }
}