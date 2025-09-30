
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "fhevm-solidity/lib/TFHE.sol";

contract ConfidentialToken {
    mapping(address => euint64) private balances;

    constructor(einput initialBalance, bytes calldata attestation) {
        // Set deployer balance
        euint64 init = TFHE.asEuint64(initialBalance, attestation);
        balances[msg.sender] = init;
        TFHE.allowThis(init);
    }

    function transfer(
        address from,
        address to,
        einput amountInput,
        bytes calldata attestation
    ) public {
        // Verify encrypted input
        euint64 amount = TFHE.asEuint64(amountInput, attestation);

        // Ensure sender has access
        require(TFHE.isSenderAllowed(balances[from]), "Not allowed");

        // Compute balances
        balances[from] = TFHE.sub(balances[from], amount);
        balances[to] = TFHE.add(balances[to], amount);

        // Allow future access
        TFHE.allowThis(balances[from]);
        TFHE.allowThis(balances[to]);
    }

    function encryptedBalanceOf(address user) public view returns (euint64) {
        return balances[user];
    }
}
