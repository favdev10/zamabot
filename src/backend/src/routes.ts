
import express, { Request, Response } from 'express';
import { walletAuth } from './middleware/auth';
import { generateNonce, getNonce } from './middleware/nonce';
import { sendToZama } from './zamaApi';
import { saveChat, getChatHistory } from './db/chatHistory';

const router = express.Router();

// Endpoint to generate nonce for wallet address
router.post('/api/nonce', generateNonce);

// Endpoint to verify wallet signature and authenticate
router.post('/api/auth', async (req: Request, res: Response) => {
  const { walletAddress, nonce, signature } = req.body;
  if (!walletAddress || !nonce || !signature) {
    return res.status(400).json({ error: 'Missing wallet authentication data.' });
  }
  const expectedNonce = getNonce(walletAddress);
  if (nonce !== expectedNonce) {
    return res.status(401).json({ error: 'Invalid nonce.' });
  }
  try {
    const { verifyMessage } = await import('ethers');
    const recovered = verifyMessage(nonce, signature);
    if (recovered.toLowerCase() !== walletAddress.toLowerCase()) {
      return res.status(401).json({ error: 'Invalid wallet signature.' });
    }
    // Auth success: session logic can be added here
    res.json({ success: true });
  } catch (err: any) {
    res.status(401).json({ error: 'Wallet verification failed.' });
  }
});

router.post('/api/chat', walletAuth, async (req: Request, res: Response) => {
  const { message } = req.body;
  const walletAddress = req.user?.walletAddress;
  if (!message || !walletAddress) {
    return res.status(400).json({ error: 'Message and wallet required.' });
  }
  try {
    const aiResponse = await sendToZama(message, walletAddress);
    await saveChat(walletAddress, message, aiResponse.reply || '');
    res.json({ reply: aiResponse.reply });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/api/history', walletAuth, async (req: Request, res: Response) => {
  const walletAddress = req.user?.walletAddress;
  if (!walletAddress) {
    return res.status(401).json({ error: 'Wallet authentication required.' });
  }
  try {
    const history = await getChatHistory(walletAddress);
    res.json({ history });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
