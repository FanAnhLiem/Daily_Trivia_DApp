# Screenshot
<img width="626" height="857" alt="image" src="https://github.com/user-attachments/assets/5b57187c-2e06-4f88-bf35-d0654dcf1dd7" />

# Explorer Link & Contract Address

Network: devnet
Package ID: 0xf125cefba8ca4c583b120ff6decba0b2c4874f5efc75a2009230723c9f64d202
Explorer: https://explorer.iota.org/object/0xf125cefba8ca4c583b120ff6decba0b2c4874f5efc75a2009230723c9f64d202?network=devnet

# 🧠 Daily Trivia DApp  
**On-Chain Daily Quiz Game on IOTA (Move + Next.js)**

Daily Trivia is a decentralized on-chain quiz game built on the **IOTA blockchain**.  
Players answer a multiple-choice question (A–D). If the answer is correct, the smart contract automatically **mints and transfers a Flag NFT reward** to the player’s wallet.

This project demonstrates:
- On-chain game logic with **Move**
- Wallet & transaction integration on **IOTA**
- A modern **Next.js dApp frontend**
- End-to-end Web3 flow: **UI → Wallet → Blockchain → UI**

---

## 🔗 Live Network & Contract

- **Network:** IOTA Devnet  
- **Smart Contract (Package ID – Devnet):**
```
0xf125cefba8ca4c583b120ff6decba0b2c4874f5efc75a2009230723c9f64d202
```

- **Main On-Chain Module:**
```
daily_trivia::daily_trivia
```

> ⚠️ Note: Testnet/Mainnet deployment can be added later.

---

## 🚀 Core Features

- 🔐 Wallet connection using **IOTA Wallet**
- 📝 Multiple-choice quiz (A, B, C, D)
- ✅ On-chain answer verification using Move
- 🎁 Automatic NFT reward (Flag) for correct answers
- 🔗 Full transaction hash display
- 🧾 On-chain object inspection (created Flag objects)
- ❌ Error handling for wrong answers and blockchain failures

---

## 🛠 Technology Stack

### Blockchain & Smart Contracts
- **Blockchain:** IOTA Devnet
- **Language:** Move (IOTA)
- **Object Model:** UID-based on-chain objects
- **Transaction Execution:** IOTA Transaction API

### Frontend
- **Framework:** Next.js (App Router, TypeScript)
- **Wallet & SDK:**  
  - `@iota/dapp-kit`  
  - `@iota/iota-sdk`
- **UI Library:** Radix UI
- **State & Data:** React Hooks, React Query
- **Spinner:** react-spinners

---

## 📁 Project Structure

```txt
daily-trivia-dapp/
  app/
    layout.tsx        # Root layout
    page.tsx          # Main UI
    providers.tsx     # Wallet + Query + Theme providers
    globals.css
  hooks/
    useDailyTrivia.ts # Blockchain interaction logic
  lib/
    config.ts         # Network & contract configuration
  package.json

daily_trivia/         # Move smart contract
  Move.toml
  sources/
    daily_trivia.move
  tests/
    daily_trivia_tests.move
```

---

## ⚙️ Smart Contract Overview (Move)

### Main On-Chain Objects
- `TriviaConfig` – stores correct answer
- `AnswerRecord` – stores each player’s answer
- `Flag` – NFT reward for correct answers

### Main Entry Function

```move
public entry fun answer_trivia(choice: u8, ctx: &mut TxContext)
```

### On-Chain Logic

1. Validate choice (0–3)
2. Compare with correct answer
3. Store answer on-chain
4. If correct:
   - Mint `Flag`
   - Transfer to player

---

## 🧭 Application Flow

```text
User → Web UI → Wallet Signature → IOTA Blockchain
     ← Transaction Digest ← Confirmed Effects ← UI Update
```

Detailed flow:

1. User connects wallet
2. User selects an answer (A–D)
3. User submits transaction
4. Wallet signs transaction
5. Smart contract executes on IOTA
6. If correct → Flag NFT is minted
7. Frontend reads created objects
8. UI displays result + transaction hash

---

## 🏗 Local Development Setup

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Configure Contract Address

Edit:

```ts
// lib/config.ts
export const TRIVIA_PACKAGE_ID = "0xf125cefba8ca4c583b120ff6decba0b2c4874f5efc75a2009230723c9f64d202";
```

### 3️⃣ Run the dApp

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## ⚙️ Smart Contract Build & Deployment

From the `daily_trivia` contract directory:

```bash
iota move build
```

Publish to Devnet:

```bash
iota client publish --gas-budget 200000000 .
```

Copy the returned `PackageID` and update it in:

```ts
lib/config.ts
```

---

## 🎮 How to Play

1. Open the dApp in your browser
2. Connect your IOTA wallet
3. Choose answer **A / B / C / D**
4. Click **Submit Answer**
5. Wait for transaction confirmation
6. If correct → You receive a **Flag NFT**
7. Transaction hash is displayed on screen

---

## 🔐 Security & Validation

- All answer checks are executed **on-chain**
- Rewards are minted only by the smart contract
- No off-chain trust required
- Full transaction verification via IOTA Explorer
- Wallet signature required for every action

---

## 📌 Known Limitations (Current Version)

- Only one fixed question (hard-coded)
- No daily reset yet
- Users can answer multiple times
- No leaderboard implemented yet

---

## 🧩 Future Improvements

- Admin-configurable daily questions
- One answer per wallet per day
- On-chain leaderboard & scoring
- Time-based reset mechanism
- Multiple reward tiers (rare NFTs)

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Author

Developed as part of a Web3 learning & portfolio project using:

- IOTA Move
- Modern Next.js dApp architecture
- Full on-chain game logic
