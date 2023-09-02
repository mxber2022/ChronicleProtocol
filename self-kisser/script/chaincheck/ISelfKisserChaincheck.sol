// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {Vm} from "forge-std/Vm.sol";
import {stdJson} from "forge-std/StdJson.sol";
import {StdStyle} from "forge-std/StdStyle.sol";

import {Chaincheck} from "@script/chronicle-std/Chaincheck.sol";
import {IAuthChaincheck} from "@script/chronicle-std/IAuthChaincheck.sol";

import {ISelfKisser} from "src/ISelfKisser.sol";

/**
 * @notice ISelfKisser's `chaincheck` Integration Test
 *
 * @dev Config Definition:
 *
 *      ```json
 *      {
 *          "ISelfKisser": {
 *              "oracles": [
 *                  "<Ethereum address>",
 *                  ...
 *              ],
 *              "dead": bool
 *          },
 *          "IAuth": {
 *              "legacy": bool,
 *              "authed": [
 *                  "<Ethereum address>",
 *                  ...
 *              ]
 *          }
 *      }
 *      ```
 */
contract ISelfKisserChaincheck is Chaincheck {
    using stdJson for string;

    Vm internal constant vm =
        Vm(address(uint160(uint(keccak256("hevm cheat code")))));

    ISelfKisser private self;
    string private config;

    string[] private logs;

    function setUp(address self_, string memory config_)
        external
        override(Chaincheck)
        returns (Chaincheck)
    {
        self = ISelfKisser(self_);
        config = config_;

        return Chaincheck(address(this));
    }

    function run()
        external
        override(Chaincheck)
        returns (bool, string[] memory)
    {
        check_oracles_ContainsOnlySupportedOracles();
        check_oracles_ContainsAllSupportedOracles();
        check_dead();

        check_IAuth();

        // Fail run if non-zero number of logs.
        return (logs.length == 0, logs);
    }

    function check_oracles_ContainsOnlySupportedOracles() internal {
        address[] memory oracles =
            config.readAddressArray(".ISelfKisser.oracles");

        address oracle;
        for (uint i; i < oracles.length; i++) {
            oracle = oracles[i];

            if (!self.oracles(oracle)) {
                logs.push(
                    string.concat(
                        StdStyle.red("Expected oracle not supported: "),
                        vm.toString(oracle)
                    )
                );
            }
        }
    }

    function check_oracles_ContainsAllSupportedOracles() internal {
        address[] memory expected =
            config.readAddressArray(".ISelfKisser.oracles");
        address[] memory actual = self.oracles();

        for (uint i; i < actual.length; i++) {
            for (uint j; j < expected.length; j++) {
                if (actual[i] == expected[j]) {
                    break; // Found address. Continue with outer loop.
                }

                // Log if unknown address auth'ed.
                if (j == expected.length - 1) {
                    logs.push(
                        string.concat(
                            StdStyle.red("Unknown oracle supported: "),
                            vm.toString(actual[i])
                        )
                    );
                }
            }
        }
    }

    function check_dead() internal {
        bool wantDead = config.readBool(".ISelfKisser.dead");
        bool gotDead = self.dead();

        if (wantDead != gotDead) {
            logs.push(
                string.concat(
                    StdStyle.red("Dead mismatch:"),
                    " expectedDead=",
                    vm.toString(wantDead),
                    ", gotDead=",
                    vm.toString(gotDead)
                )
            );
        }
    }

    // -- Dependency Checks --

    /// @dev Checks the IAuth module dependency.
    function check_IAuth() internal {
        // Run IAuth chaincheck.
        string[] memory authLogs;
        (, authLogs) = new IAuthChaincheck()
                            .setUp(address(self), config)
                            .run();

        // Add logs to own logs.
        for (uint i; i < authLogs.length; i++) {
            logs.push(authLogs[i]);
        }
    }
}
