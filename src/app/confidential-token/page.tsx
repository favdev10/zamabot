"use client";
import { useState } from "react";
import { ethers } from "ethers";
import {
  createInstance,
  SepoliaConfig,
  createEncryptedInput,
  userDecrypt,
} from "@zama-fhe/relayer-sdk";

export default function ConfidentialTokenApp() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [chatResponse, setChatResponse] = useState("");

  // ✅ 1. Encrypt amount & call transfer
  const handleTransfer = async () => {
    if (!amount || !recipient) return;

    // 1. Connect wallet
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    // 2. Init relayer instance
    const instance = await createInstance(SepoliaConfig);

    // 3. Encrypt input (amount)
    const encryptedAmount = await createEncryptedInput(
      instance,
      signer,
      "uint64", // must match your contract parameter type
      amount
    );

    // 4. Call transfer with ciphertext handle
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      [
        "function transfer(address from, address to, euint64 amount) public",
      ],
      signer
    );

    const tx = await contract.transfer(await signer.getAddress(), recipient, encryptedAmount.handle);
    await tx.wait();

    alert("Confidential transfer submitted!");
  };

  // ✅ 2. User decrypt balance
  const handleDecryptBalance = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();

    const instance = await createInstance(SepoliaConfig);

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      ["function encryptedBalanceOf(address) view returns (euint64)"],
      provider
    );

    const encryptedBalance = await contract.encryptedBalanceOf(await signer.getAddress());

    // userDecrypt() triggers EIP-712 signing & returns plaintext
    const decrypted = await userDecrypt(instance, signer, encryptedBalance);

    setBalance(decrypted.toString());
  };

  // ✅ 3. Call Zama Chatbot API
  const handleChat = async () => {
    const res = await fetch("https://api.zama.ai/chatbot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "How do I debug confidential ERC20 transfers?",
      }),
    });
    const data = await res.json();
    setChatResponse(data.answer || "No response");
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Confidential ERC20 (FHEVM)</h1>

      {/* Transfer */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Transfer</h2>
        <input
          className="border p-2 rounded w-full"
          placeholder="Recipient address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleTransfer}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Confidential Transfer
        </button>
      </div>

      {/* Balance */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Balance</h2>
        <button
          onClick={handleDecryptBalance}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Decrypt My Balance
        </button>
        {balance && <p>Your balance: {balance}</p>}
      </div>

      {/* Chatbot */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Ask Zama Chatbot</h2>
        <button
          onClick={handleChat}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Ask About FHEVM
        </button>
        {chatResponse && <p className="p-2 border rounded">{chatResponse}</p>}
      </div>
    </div>
  );
}
