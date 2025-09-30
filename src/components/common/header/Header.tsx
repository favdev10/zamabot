"use client";
import { useState } from "react";
import Image from "next/image";
import { ethers } from "ethers";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if (!(window as any).ethereum) {
        alert("MetaMask not detected. Please install it first.");
        return;
      }

      // Request wallet connection
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setAccount(address);
    } catch (err) {
      console.error("Wallet connection failed:", err);
    }
  };
  return (
    <header className="bg-black text-white">
      <header className="w-full px-6 lg:px-20 py-4 flex items-center justify-between relative">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/media/logo/logo1.png"
            alt="Zama Logo"
            width={40}
            height={40}
          />
          <span className="text-3xl text-white font-bold">
            zama<span className="text-yellow-400">chatbot</span>
          </span>
        </div>
        {/* Navigation (Desktop) */}
        <nav className="hidden lg:flex gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <a href="#" className="text-lg hover:text-yellow-400">
            Home
          </a>
          <a href="#" className="text-lg hover:text-yellow-400">
            About Us
          </a>
          <a href="#" className="text-lg hover:text-yellow-400">
            Support
          </a>
        </nav>
        {/* Wallet Button */}
        <button
          onClick={connectWallet}
          className="hidden lg:block bg-yellow-400 text-black px-6 py-3 rounded-full font-medium hover:bg-yellow-300 transition"
        >
          {account
            ? `${account.slice(0, 6)}...${account.slice(-4)}`
            : "Connect Wallet"}
        </button>
        {/* Mobile Menu Button */}
        <button
          title="Menu"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white"
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>
        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="flex flex-col bg-black px-6 py-4 space-y-4 absolute top-full left-0 right-0 lg:hidden">
            <a href="#" className="hover:text-yellow-400">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400">
              About Us
            </a>
            <a href="#" className="hover:text-yellow-400">
              Support
            </a>
            <button className="bg-yellow-400 text-black px-6 py-2 rounded-full w-fit">
              Connect Wallet
            </button>
          </div>
        )}
      </header>
    </header>
  );
}
