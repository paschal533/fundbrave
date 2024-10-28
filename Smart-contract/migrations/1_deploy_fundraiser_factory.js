const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

module.exports = async function (deployer) {
  deployer.deploy(FundraiserFactoryContract);
};
