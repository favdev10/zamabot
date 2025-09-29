# ZamaBot Backend

## Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
```
cp .env.example .env
```
- `ZAMA_API_KEY`: Your Zama AI API key
- `ZAMA_API_ENDPOINT`: Zama AI endpoint
- `DATABASE_URL`: PostgreSQL connection string

### 2. Install Dependencies
```
cd src/backend
npm install
```

### 3. Running the Backend
```
npm run dev
```

### 4. Wallet Setup
- Frontend should use `ethers.js` to connect wallet and sign messages.
- Backend verifies wallet signatures for authentication.

### 5. Database Migrations
- Use PostgreSQL. Migration scripts will be added in `/migrations`.

### 6. API Usage
- `POST /api/chat`: Send message to Zama AI
- `GET /api/history`: Fetch chat history (wallet-auth required)

---

## Tech Stack
- Express.js
- PostgreSQL
- ethers.js
- Zama AI API

## References
- [Zama Docs](https://docs.zama.ai/protocol/solidity-guides)
- [Ethersjs](https://docs.ethers.io)
- [Nextjs Doc and middleware](https://docs.nestjs.com/guards)
