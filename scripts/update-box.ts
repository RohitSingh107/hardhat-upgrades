import { ethers } from "hardhat";
import { BoxProxyAdmin, BoxV2 } from "../typechain-types";

async function main() {
  const boxProxyAdmin: BoxProxyAdmin = await ethers.getContract(
    "BoxProxyAdmin"
  );
  const transparentProxy = await ethers.getContract("Box_Proxy");

  const proxyBoxV1 = await ethers.getContractAt(
    "Box",
    transparentProxy.address
  );
  const versionV1 = await proxyBoxV1.version();
  console.log(versionV1);

  const boxV2: BoxV2 = await ethers.getContract("BoxV2");
  const upgradeTx = await boxProxyAdmin.upgrade(
    transparentProxy.address,
    boxV2.address
  );
  await upgradeTx.wait();

  const proxyBoxV2 = await ethers.getContractAt(
    "BoxV2",
    transparentProxy.address
  );
  const versionV2 = await proxyBoxV2.version();
  console.log(versionV2);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
