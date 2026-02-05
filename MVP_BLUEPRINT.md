# Smart Contract Safety System MVP (Beginner Blueprint)

No full code yet — this is the project layout and what each file will do.

## 1) Folder Structure

```text
smart-contract-safety-mvp/
├─ frontend/
│  ├─ index.html
│  ├─ styles.css
│  ├─ app.js
│  └─ config.js
├─ blockchain/
│  ├─ contracts/
│  │  └─ SafetyChecker.sol
│  └─ abi/
│     └─ SafetyChecker.json
├─ docs/
│  ├─ network-setup.md
│  └─ threat-model.md
├─ package.json
├─ .env.example
└─ README.md
```

## 2) File Names + Simple Purpose

### `frontend/index.html`
- Main page UI.
- Has wallet connect button.
- Has input for Ethereum address.
- Has section to show status as:
  - **SAFE** = “Looks okay”
  - **WARNING** = “Be careful”
  - **DANGER** = “Stop! Something risky”

### `frontend/styles.css`
- Visual style for beginner-friendly UI.
- Uses simple colors:
  - Green for SAFE
  - Yellow/Orange for WARNING
  - Red for DANGER

### `frontend/app.js`
- Main frontend logic with **ethers.js**.
- Handles:
  1. **Wrong network detection** (if user is not on chosen Ethereum testnet).
  2. **Ethereum address validation** (check input format).
  3. **Unlimited approval warning** (detect very large allowance request / max uint256 intent).
  4. Convert technical result into child-friendly message.

### `frontend/config.js`
- Stores app config values:
  - Target testnet chain ID (for example: Sepolia).
  - Contract address.
  - Block explorer links.

### `blockchain/contracts/SafetyChecker.sol`
- Small helper smart contract for on-chain checks (MVP level).
- Can expose helper methods to label risk signals.
- Keeps logic clear and auditable.

### `blockchain/abi/SafetyChecker.json`
- ABI file used by frontend `ethers.js` to call `SafetyChecker`.

### `docs/network-setup.md`
- Step-by-step guide to:
  - Add/select Ethereum testnet in wallet.
  - Set RPC and chain settings.
  - Verify wallet network quickly.

### `docs/threat-model.md`
- Very simple list of what we protect against in MVP:
  - Wrong chain use.
  - Bad address input.
  - Unlimited token approval risk.
- Also lists what MVP does **not** cover yet.

### `package.json`
- JavaScript dependencies and scripts.
- Includes `ethers` dependency and dev scripts.

### `.env.example`
- Example environment variables:
  - RPC URL
  - Deployed contract address
  - Target chain ID

### `README.md`
- Quick start for beginners:
  - Install
  - Run frontend
  - Connect wallet
  - Test each safety feature

## 3) MVP Feature Mapping (Requirement → File)

- **Detect wrong network** → `frontend/app.js` + `frontend/config.js`
- **Validate Ethereum address** → `frontend/app.js`
- **Warn on unlimited token approval** → `frontend/app.js` (+ optional helper in `SafetyChecker.sol`)
- **SAFE / WARNING / DANGER child-friendly output** → `frontend/index.html` + `frontend/styles.css` + `frontend/app.js`

## 4) Suggested Testnet for Beginner MVP

- Use **Ethereum Sepolia** testnet first.
- It is common, documented, and easy to test with faucets.
