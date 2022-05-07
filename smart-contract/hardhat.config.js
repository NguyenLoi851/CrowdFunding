require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = fs.readFileSync('.secret').toString();

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/SWzV71Ya13rJJqXKdcU7PCZ_rEoN-enc',
      accounts: [privateKey]
    }
  }
};
