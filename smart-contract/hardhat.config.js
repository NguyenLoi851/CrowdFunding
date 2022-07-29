require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");

// const fs = require("fs");
// const privateKey = fs.readFileSync('.secret').toString();
require("dotenv").config()

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: process.env.PROVIDER_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.PROVIDER_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    mumbai: {
      url: process.env.PROVIDER_URL,
      chainId: 80001,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
  etherscan: {
    apiKey: process.env.MUMBAI_SCAN,
  }
};
