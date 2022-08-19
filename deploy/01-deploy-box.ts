import { network, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId: number = network.config.chainId!;
  //
  log("-------------------------------------------");

  const waitConfirmations = networkConfig[chainId]["waitConfirmations"] || 1;

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: waitConfirmations,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      viaAdminContract: "BoxProxyAdmin",
    },
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(box.address, []);
  }
  log("-----------------------------------------");
};

module.exports.tags = ["all", "main"];
