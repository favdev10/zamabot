// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {FHE, euint64, externalEuint64} from "fhevm-solidity/lib/FHE.sol";

contract ConfidentialToken {
    mapping(address => euint64) private balances;

    constructor(externalEuint64 initialBalance, bytes calldata attestation) {
        // Set deployer balance
        euint64 init = FHE.fromExternal(initialBalance, attestation);
        balances[msg.sender] = init;
        FHE.allow(init, msg.sender);       // allow deployer to view
        FHE.allow(init, address(this));    // allow contract to use
    }

    function transfer(
        address from,
        address to,
        externalEuint64 amountExt,
        bytes calldata attestation
    ) public {
        // Verify encrypted input
        euint64 amount = FHE.fromExternal(amountExt, attestation);

        // Ensure sender has access
        require(FHE.isSenderAllowed(balances[from]), "Not allowed");

        // Compute balances
        balances[from] = FHE.sub(balances[from], amount);
        balances[to] = FHE.add(balances[to], amount);

        // Allow future access
        FHE.allow(balances[from], from);
        FHE.allow(balances[to], to);
        FHE.allow(balances[from], address(this));
        FHE.allow(balances[to], address(this));
    }

    function encryptedBalanceOf(address user) public view returns (euint64) {
        return balances[user];
    }
}
