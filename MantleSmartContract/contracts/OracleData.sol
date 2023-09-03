// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OracleData is Ownable {

    mapping(string => uint256) public mean;

    function storeOracleData(string memory oracle, uint256 meanData) public {
        mean[oracle] = meanData;
    }

}
