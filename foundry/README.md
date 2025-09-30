# Foundry Smart Contract Setup for Zama ConfidentialToken

## Prerequisites
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- FHEVM Solidity library ([Zama Docs](https://docs.zama.ai/protocol/solidity-guides/smart-contract/configure))

## Structure
- `src/ConfidentialToken.sol`: Confidential ERC20 contract using Zama FHEVM
- `script/Deploy.s.sol`: Deployment script

## How to Deploy
1. Install dependencies:
	```bash
	forge install
	```
2. Configure FHEVM library in `lib/` as per Zama docs.
3. Set your encrypted initial balance and attestation in `Deploy.s.sol`.
4. Deploy locally:
	```bash
	forge script script/Deploy.s.sol --rpc-url <YOUR_RPC_URL> --broadcast
	```
5. For Sepolia/FHEVM, use the correct RPC and follow Zama's deployment guide.

## Frontend Integration
- Use the deployed contract address in your Next.js `.env` as `NEXT_PUBLIC_CONTRACT_ADDRESS`.
- Interact via ethers.js and `@zama-fhe/relayer-sdk` as shown in your UI code.
## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
