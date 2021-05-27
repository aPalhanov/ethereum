const DeedMultiPayouts = artifacts.require("DeedMultiPayouts");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(DeedMultiPayouts, accounts[0], accounts[1],  0, {value: 100} );
};
