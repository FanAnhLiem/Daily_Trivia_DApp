

# ✅ README 2 — **Daily Trivia DApp**

# 🧠 Daily Trivia DApp (On-Chain Quiz Game on IOTA)

Daily Trivia is an on-chain quiz game built on **IOTA Devnet** using **Move** smart contracts and a **Next.js** frontend.

Players answer a multiple-choice question (A–D).  
If the answer is correct, the smart contract **mints a Flag NFT** as a reward.

---

## 🚀 Features

- Wallet connection with IOTA Wallet
- Multiple-choice quiz (A, B, C, D)
- On-chain answer verification
- Automatic reward minting for correct answers
- Transaction hash and result shown on UI

---

## 🛠 Tech Stack

- **Blockchain:** IOTA Devnet
- **Smart Contract:** Move (IOTA)
- **Frontend:** Next.js (App Router)
- **Wallet & SDK:** `@iota/dapp-kit`, `@iota/iota-sdk`
- **UI:** Radix UI
- **Data Handling:** React Query

---

## 📁 Project Structure

```txt
daily-trivia-dapp/
  app/
    layout.tsx
    page.tsx
    providers.tsx
    globals.css
  hooks/
    useDailyTrivia.ts
  lib/
    config.ts
  package.json

daily_trivia/            # Move contract
  Move.toml
  sources/
    daily_trivia.move
```
