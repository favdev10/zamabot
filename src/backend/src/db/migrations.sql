CREATE TABLE IF NOT EXISTS chat_history (
  id SERIAL PRIMARY KEY,
  wallet_address VARCHAR(64) NOT NULL,
  message TEXT NOT NULL,
  response TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
