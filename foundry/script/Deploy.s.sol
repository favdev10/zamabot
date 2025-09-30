// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import {ConfidentialToken} from "../src/ConfidentialToken.sol";

contract DeployConfidentialToken is Script {
    function run() external {
        // Replace with actual encrypted initial balance and attestation
        externalEuint64 initialBalance = externalEuint64.wrap(0);
        bytes memory attestation = hex"";
        vm.startBroadcast();
        new ConfidentialToken(initialBalance, attestation);
        vm.stopBroadcast();
    }
}
