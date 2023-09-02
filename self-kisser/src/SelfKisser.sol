// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import {IAuth} from "chronicle-std/auth/IAuth.sol";
import {Auth} from "chronicle-std/auth/Auth.sol";

import {IToll} from "chronicle-std/toll/IToll.sol";

import {ISelfKisser} from "./ISelfKisser.sol";

contract SelfKisser is ISelfKisser, Auth {
    /// @dev Mapping storing whether address is supported oracle.
    mapping(address => uint) internal _oracles;

    /// @dev List of addresses possibly being supported oracles.
    /// @dev May contain duplicates.
    /// @dev May contain addresses not being supported oracles anymore.
    address[] internal _oraclesTouched;

    /// @dev Whether SelfKisser is dead.
    uint internal _dead;

    modifier live() {
        if (_dead == 1) {
            revert Dead();
        }
        _;
    }

    modifier supported(address oracle) {
        if (_oracles[oracle] == 0) {
            revert OracleNotSupported(oracle);
        }
        _;
    }

    constructor(address initialAuthed) Auth(initialAuthed) {}

    // -- User Functionality --

    /// @inheritdoc ISelfKisser
    function selfKiss(address oracle) external {
        selfKiss(oracle, msg.sender);
    }

    /// @inheritdoc ISelfKisser
    function selfKiss(address oracle, address who)
        public
        live
        supported(oracle)
    {
        IToll(oracle).kiss(who);
        emit SelfKissed(msg.sender, oracle, who);
    }

    // -- View Functionality --

    /// @inheritdoc ISelfKisser
    function oracles(address oracle) external view returns (bool) {
        return _oracles[oracle] == 1;
    }

    /// @inheritdoc ISelfKisser
    function oracles() external view returns (address[] memory) {
        // Initiate array with upper limit length.
        address[] memory oraclesList = new address[](_oraclesTouched.length);

        // Iterate through all possible support oracle.
        uint ctr;
        for (uint i; i < oraclesList.length; i++) {
            // Add address only if still auth'ed.
            if (_oracles[_oraclesTouched[i]] == 1) {
                oraclesList[ctr++] = _oraclesTouched[i];
            }
        }

        // Set length of array to number of oracles actually included.
        assembly ("memory-safe") {
            mstore(oraclesList, ctr)
        }

        return oraclesList;
    }

    /// @inheritdoc ISelfKisser
    function dead() external view returns (bool) {
        return _dead == 1;
    }

    // -- Auth'ed Functionality --

    /// @inheritdoc ISelfKisser
    function support(address oracle) external live auth {
        if (_oracles[oracle] == 1) return;

        require(IAuth(oracle).authed(address(this)));

        _oracles[oracle] = 1;
        _oraclesTouched.push(oracle);
        emit OracleSupported(msg.sender, oracle);
    }

    /// @inheritdoc ISelfKisser
    function unsupport(address oracle) external live auth {
        if (_oracles[oracle] == 0) return;

        _oracles[oracle] = 0;
        emit OracleUnsupported(msg.sender, oracle);
    }

    /// @inheritdoc ISelfKisser
    function kill() external auth {
        if (_dead == 1) return;

        _dead = 1;
        emit Killed(msg.sender);
    }
}

/**
 * @dev Contract overwrite to deploy contract instances with specific naming.
 *
 *      For more info, see docs/Deployment.md.
 */
contract SelfKisser_COUNTER is SelfKisser {
    constructor(address initialAuthed) SelfKisser(initialAuthed) {}
}
