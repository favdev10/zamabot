import { Request, Response } from 'express';
import crypto from 'crypto';

const nonces: Record<string, string> = {};

export function generateNonce(req: Request, res: Response) {
  const { walletAddress } = req.body;
  if (!walletAddress) return res.status(400).json({ error: 'Wallet address required.' });
  const nonce = crypto.randomBytes(16).toString('hex');
  nonces[walletAddress] = nonce;
  res.json({ nonce });
}

export function getNonce(walletAddress: string) {
  return nonces[walletAddress];
}
