

# ZamaBot 🛡️🤖

A confidential chatbot and dApp built with **Next.js**, **Solidity**, and **Zama’s FHEVM**.
ZamaBot demonstrates how to build private on-chain interactions using **Fully Homomorphic Encryption (FHE)** via Zama’s protocol and Relayer SDK.

---

## ✨ Features

* 🔐 **Confidential ERC20 transfers** — balances and amounts remain encrypted on-chain.
* 👛 **Wallet integration** — connect MetaMask to interact with contracts.
* 📊 **Balance decryption** — view your encrypted token balance privately.
* 💬 **Chatbot interface** — interact with an AI chatbot about FHEVM, Zama, and confidential smart contracts.
* 🛠️ **Smart contracts in Solidity** using `@fhevm/solidity/lib/FHE.sol`.
* 🌐 **Frontend with Next.js 13 (App Router)** styled using Tailwind CSS.

---

## 📂 Project Structure

```
zamabot/
│── contracts/       # Solidity smart contracts using FHE
│── foundry/         # Foundry setup for testing/deployment
│── public/          # Static assets (logos, images)
│── src/             # Next.js frontend (components, pages, app router)
│── package.json     # Project dependencies
│── next.config.ts   # Next.js configuration
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/favdev10/zamabot.git
cd zamabot
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root and add:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=<your_deployed_contract_address>
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🔧 Smart Contracts

Contracts use Zama’s **FHEVM Solidity library**:

```solidity
import { FHE, euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
```

* `transfer` handles confidential token transfers.
* `encryptedBalanceOf` returns encrypted balances that can be decrypted by users via the Relayer SDK.

Compile and test contracts with **Foundry**:

```bash
forge build
forge test
```

---

## 🔗 Frontend Integration

The frontend uses **Zama Relayer SDK**:

```ts
import {
  createInstance,
  SepoliaConfig,
  createEncryptedInput,
  userDecrypt,
} from "@zama-fhe/relayer-sdk";
```

* `createEncryptedInput` → encrypts user inputs before sending to contracts.
* `userDecrypt` → decrypts balances privately via EIP-712 signatures.

---

## 🛡️ Requirements

* Node.js ≥ 18
* MetaMask or any EIP-1193 wallet
* Foundry (for contract dev/test)
* Sepolia ETH (if deploying to Sepolia testnet)

---

## 📜 License

MIT License © 2025 [favdev10](https://github.com/favdev10)
