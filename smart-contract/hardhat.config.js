require("@nomiclabs/hardhat-waffle");

const fs = require("fs");
const privateKey = fs.readFileSync('.secret').toString();

module.exports = {
  solidity: "0.8.0",
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/SWzV71Ya13rJJqXKdcU7PCZ_rEoN-enc',
      accounts: [privateKey]
    },
    rinkeby: {
      url: 'https://eth-rinkeby.alchemyapi.io/v2/SWzV71Ya13rJJqXKdcU7PCZ_rEoN-enc',
      accounts: [privateKey]
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/SWzV71Ya13rJJqXKdcU7PCZ_rEoN-enc',
      accounts: [privateKey]
    }
  }
};
