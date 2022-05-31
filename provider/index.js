require('dotenv').config();
const hardhat = require('hardhat');
const axios = require('axios');

const MAX_RETRIES = 5;
const SLEEP_TIME = 2000;
const BATCH_SIZE = 3;

async function requestRandomNumber() {
    const res = await axios({
        url: 'https://www.random.org/integers/',
        params: {
            num: 1,
            min: 1,
            max: 1000,
            col: 1,
            base: 10,
            format: 'plain',
            rnd: 'new'
        },
            method: 'get'
        });
    
    return parseInt(res.data);
}

async function main() {

    // Initialize account
    const [ dataProvider ] = await hardhat.ethers.getSigners();

    // Initialize contract
    const oracleContractAddress = "0xf51144e8C67CF38d8964331B80301EE51fA40A14";
    const oracleContractABI = require("./randOracleABI.json");
    const oracleContract = new hardhat.ethers.Contract(oracleContractAddress, oracleContractABI, dataProvider);

    // Populate requests queue
    let requestsQueue = [];

    console.log("running...")

    oracleContract.on("RandomNumberRequested", async (callerAddress, id) => {
        console.log("requested")
        requestsQueue.push({ callerAddress, id });
    });
    
    // Poll and process requests queue at intervals
    setInterval(async() => {
        let processedRequests = 0;

        while (requestsQueue.length > 0 && processedRequests < BATCH_SIZE) {
            const request = requestsQueue.shift();
    
            let retries = 0;
            while (retries < MAX_RETRIES) {
                try {
                    const randomNumber = await requestRandomNumber();
                
                    await oracleContract.returnRandomNumber(randomNumber, request.callerAddress, request.id);
                    console.log("request completed")
                    break;
                } catch (error) {
                    retries++;
                }
            }
    
            processedRequests++;
        }

    }, SLEEP_TIME);



}

main();