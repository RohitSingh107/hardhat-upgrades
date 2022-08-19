// SPDX-License-Identifier: GPL3

pragma solidity ^0.8.9;
import "@openzeppelin/contracts/proxy/transparent/ProxyAdmin.sol";

contract BoxProxyAdmin is ProxyAdmin {
  constructor(
    address /* owner */
  ) ProxyAdmin() {}
}

