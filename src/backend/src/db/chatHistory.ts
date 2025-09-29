import pool from './index';

export async function saveChat(walletAddress: string, message: string, response: string) {
  await pool.query(
    'INSERT INTO chat_history (wallet_address, message, response, created_at) VALUES ($1, $2, $3, NOW())',
    [walletAddress, message, response]
  );
}

export async function getChatHistory(walletAddress: string) {
  const { rows } = await pool.query(
    'SELECT message, response, created_at FROM chat_history WHERE wallet_address = $1 ORDER BY created_at DESC',
    [walletAddress]
  );
  return rows;
}
