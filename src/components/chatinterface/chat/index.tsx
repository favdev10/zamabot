"use client";

import { useState } from "react";
import { ethers } from "ethers";
import {
  createInstance,
  SepoliaConfig,
  createEncryptedInput,
  userDecrypt,
} from "@zama-fhe/relayer-sdk";

export default function Chat() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [balance, setBalance] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatResponse, setChatResponse] = useState("");

  // Confidential transfer
  const handleTransfer = async () => {
    if (!amount || !recipient) return;
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const instance = await createInstance(SepoliaConfig);
    const encryptedAmount = await createEncryptedInput(
      instance,
      signer,
      "uint64",
      amount
    );
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      ["function transfer(address from, address to, euint64 amount) public"],
      signer
    );
    const tx = await contract.transfer(
      await signer.getAddress(),
      recipient,
      encryptedAmount.handle
    );
    await tx.wait();
    alert("Confidential transfer submitted!");
  };

  // Decrypt balance
  const handleDecryptBalance = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const signer = await provider.getSigner();
    const instance = await createInstance(SepoliaConfig);
    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
      ["function encryptedBalanceOf(address) view returns (euint64)"],
      provider
    );
    const encryptedBalance = await contract.encryptedBalanceOf(
      await signer.getAddress()
    );
    const decrypted = await userDecrypt(instance, signer, encryptedBalance);
    setBalance(decrypted.toString());
  };

  // Zama chatbot
  const handleChat = async () => {
    if (!chatInput) return;
    const res = await fetch(
      "https://chatgpt.com/g/g-687548533b7c819185a5f992b7f48e72-zama-protocol-gpt",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: chatInput }),
      }
    );
    const data = await res.json();
    setChatResponse(data.answer || "No response");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <section className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto px-4 relative space-y-10">
        <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
          Welcome To <span className="text-yellow-400">Zama-Chatbot</span>
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mb-10">
          Hi There 👋 Welcome To Zama-Chatbot! How Can I Help You Today?
        </p>

        {/* Confidential Transfer */}
        <div className="bg-yellow-900/10 border border-yellow-400/40 rounded-xl p-6 w-full max-w-xl mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-yellow-400">
            Confidential Transfer
          </h2>
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Recipient address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
          <input
            className="border p-2 rounded w-full mb-2"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button
            onClick={handleTransfer}
            className="bg-yellow-400 text-black px-4 py-2 rounded w-full font-semibold"
          >
            Send Confidential Transfer
          </button>
        </div>

        {/* Balance */}
        <div className="bg-yellow-900/10 border border-yellow-400/40 rounded-xl p-6 w-full max-w-xl mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-yellow-400">Balance</h2>
          <button
            onClick={handleDecryptBalance}
            className="bg-green-600 text-white px-4 py-2 rounded w-full font-semibold"
          >
            Decrypt My Balance
          </button>
          {balance && <p className="text-white">Your balance: {balance}</p>}
        </div>

        {/* Chatbot */}
        <div className="bg-yellow-900/10 border border-yellow-400/40 rounded-xl p-6 w-full max-w-xl mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-yellow-400">
            Ask Zama Chatbot
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about FHEVM, Zama, or confidential ERC20..."
              className="flex-1 bg-transparent outline-none text-white px-3 placeholder-gray-400 border p-2 rounded"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              title="Send Message"
              type="button"
              className="bg-yellow-400 text-black p-3 rounded-full hover:bg-yellow-300 transition"
              onClick={handleChat}
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
          {chatResponse && (
            <p className="p-2 border rounded text-white bg-black/40 mt-2">
              {chatResponse}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
