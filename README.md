# SafeTx – Smart Contract Safety System

SafeTx is a beginner-friendly security layer that helps users spot common blockchain transaction risks **before** they click confirm

## Problem Statement
Every day, users sign transactions they do not fully understand. Many scams look like normal wallet prompts, but actually request dangerous permissions (for example, unlimited token approvals).

Most people do not read raw contract data, function signatures, or network IDs. SafeTx converts technical transaction details into simple, human warnings.

## Why Blockchain Transactions Are Irreversible
On Ethereum and similar blockchains:

- Confirmed transactions are final.
- There is no "undo" button.
- If tokens are sent to the wrong address or stolen via malicious approval, recovery is very difficult.

That is why a **pre-send safety check** is critical.

## How SafeTx Protects Users
SafeTx performs a lightweight safety pass in the browser:

1. Validates wallet addresses.
2. Detects the wallet's currently connected network.
3. Compares selected network vs wallet network to prevent chain mistakes.
4. Flags dangerous action patterns (unlimited approvals, transferFrom risk, suspicious signatures).
5. Displays clear status as a traffic light:
   - Green = Safe
   - Yellow = Warning
   - Red = Danger

## Features
- Traffic-light style safety UI (simple and beginner-friendly).
- Ethereum address validation with `ethers.js`.
- Wallet network detection via injected wallet provider.
- Network mismatch warning.
- Educational risk analysis for:
  - Unlimited token approval
  - `transferFrom` risk
  - Unknown/suspicious function signatures
- Testnet-only Solidity demo contract showing safe vs dangerous approvals.

## Tech Stack
- Frontend: HTML, CSS, JavaScript
- Web3 library: `ethers.js` (v6 via CDN)
- Smart contract: Solidity `^0.8.20`
- Target environment: Ethereum testnet (recommended: Sepolia)

## Project Structure
```text
frontend/
  index.html
  styles.css
  app.js
contracts/
  SafeApprovalDemo.sol
docs/
  BEGINNER_EXPLANATION.md
README.md
```

## How to Run Locally
1. Clone repository.
2. Open `frontend/index.html` in a browser.
3. Install and unlock MetaMask (or compatible wallet).
4. Switch wallet to the network you want (for example Sepolia).
5. Enter a wallet address and choose network.
6. Click **Check Before Sending**.

> Note: This MVP is educational. It demonstrates core checks, not full production-grade security.

## Future Improvements
- Decode real pending transaction calldata directly from wallet prompts.
- Add known malicious contract list integration.
- Add simulation engine for transaction outcomes.
- Add scoring model with explainable risk factors.
- Add backend alerts + reputation feeds.
- Add unit/integration tests and CI pipeline.

---
Built for safer transaction decisions, better onboarding, and security-first Web3 UX.
