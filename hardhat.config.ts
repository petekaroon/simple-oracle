import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import '@typechain/hardhat'
import "hardhat-deploy";
import "solidity-coverage";
import '@openzeppelin/hardhat-upgrades';

require('dotenv').config()

const configure = {
  private_key: "45b8eb5cd0233218311be5d1ae6853f90354c83e19f409ec6da0d31d872b6b80",
  verify_api_key: "4C7X5VGMSF2YA3PR741AR1RGT4JAZ74KPY"
}

const testnet = {
  url: "https://data-seed-prebsc-1-s1.binance.org:8545",
  chainId: 97,
  gasPrice: 20000000000,
  accounts: [`0x${configure.private_key}`],
}

export default {
  networks: {
    alpha: { ...testnet },
    beta: { ...testnet },
    gamma: { ...testnet },
    staging: { ...testnet },
    prod: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 5000000000,
      accounts: [configure.private_key],
    },
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 5000,
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5"
  },
  etherscan: {
    apiKey: `${configure.verify_api_key}`
  },
};