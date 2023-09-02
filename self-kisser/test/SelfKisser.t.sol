// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Test} from "forge-std/Test.sol";

import {SelfKisser} from "src/SelfKisser.sol";

import {ISelfKisserTest} from "./ISelfKisserTest.sol";

contract SelfKisserTest is ISelfKisserTest {
    function setUp() public {
        setUp(address(new SelfKisser(address(this))));
    }
}
