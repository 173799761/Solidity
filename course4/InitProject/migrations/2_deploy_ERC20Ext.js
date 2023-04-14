const ERC20Ext = artifacts.require("ERC20Ext");

module.exports = function(deployer){
    deployer.deploy(ERC20Ext);
};