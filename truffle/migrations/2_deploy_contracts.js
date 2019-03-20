var PassToken = artifacts.require("Erc721Pass");

module.exports = function(deployer) {
  deployer.deploy(PassToken, web3.eth.accounts[0]);
};