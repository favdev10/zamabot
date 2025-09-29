import { useState } from 'react';
import { ethers } from 'ethers';

export default function WalletConnect() {
  const [wallet, setWallet] = useState('');
  const [nonce, setNonce] = useState('');
  const [signature, setSignature] = useState('');
  const [status, setStatus] = useState('');

  async function connectWallet() {
    if (!window.ethereum) return setStatus('MetaMask not found');
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    setWallet(accounts[0]);
    // Request nonce from backend
    const res = await fetch('/api/nonce', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress: accounts[0] })
    });
    const data = await res.json();
    setNonce(data.nonce);
  }

  async function signNonce() {
    if (!wallet || !nonce) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const sig = await signer.signMessage(nonce);
    setSignature(sig);
    setStatus('Signed!');
    // Send wallet, nonce, signature to backend for authentication
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ walletAddress: wallet, nonce, signature })
    });
  }

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {nonce && <button onClick={signNonce}>Sign Nonce</button>}
      <div>Wallet: {wallet}</div>
      <div>Status: {status}</div>
    </div>
  );
}
