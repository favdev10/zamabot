import { Request, Response, NextFunction } from 'express';
import { verifyMessage } from 'ethers';

export async function walletAuth(req: Request, res: Response, next: NextFunction) {
  const { walletAddress, signature, nonce } = req.headers;
  if (!walletAddress || !signature || !nonce) {
    return res.status(401).json({ error: 'Wallet authentication required.' });
  }
  try {
    const recovered = verifyMessage(nonce as string, signature as string);
    if (recovered.toLowerCase() !== (walletAddress as string).toLowerCase()) {
      return res.status(401).json({ error: 'Invalid wallet signature.' });
    }
    req.user = { walletAddress };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Wallet verification failed.' });
  }
}
