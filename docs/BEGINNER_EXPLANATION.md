# Beginner Line-by-Line Teaching Guide

This guide explains each file in very simple words.

## 1) `frontend/index.html`

1. `<!DOCTYPE html>` tells browser this is an HTML5 page.
2. `<html lang="en">` says page language is English.
3. `<head>` holds setup info, not visible content.
4. `<meta charset="UTF-8" />` supports normal text characters.
5. `<meta name="viewport" ...>` makes page fit phones.
6. `<title>` sets browser tab name.
7. `<link rel="stylesheet" ...>` connects CSS design file.
8. `<body>` starts visible page content.
9. `<main class="card">` creates one centered card box.
10. `<h1>` shows project title.
11. `<p class="subtitle">` shows a small helper sentence.
12. `.traffic-light` div wraps three circles.
13. `id="light-safe"` is green circle.
14. `id="light-warning"` is yellow circle.
15. `id="light-danger"` is red circle.
16. `<label for="walletAddress">` names address input.
17. `<input id="walletAddress" ...>` lets user type wallet address.
18. `<label for="networkSelect">` names network dropdown.
19. `<select id="networkSelect">` lets user pick chain.
20. `<option value="11155111">` means Sepolia chain ID.
21. `<option value="1">` means Mainnet chain ID.
22. `<button id="checkButton">` is the only action button.
23. `.result-box` holds output messages.
24. `resultMessage` shows status like safe/warning/error.
25. `riskMessage` shows extra explanation in plain words.
26. Script tag for ethers loads blockchain library.
27. Script tag for `app.js` runs our logic.

## 2) `frontend/styles.css`

1. `:root` stores color variables to reuse easily.
2. `* { box-sizing: border-box; }` makes sizing predictable.
3. `body` styles whole page and centers card.
4. `.card` styles main white panel with shadow.
5. `h1` and `.subtitle` style heading text.
6. `.traffic-light` puts circles in one row.
7. `.light` gives each circle size and low opacity.
8. `.safe/.warning/.danger` set green/yellow/red colors.
9. `.light.active` makes selected light glow/visible.
10. `label` styles input labels.
11. `input, select, button` gives same simple shape.
12. `button:hover` changes blue on mouse hover.
13. `.result-box` styles result area under button.
14. `.risk-message` styles second message line.

## 3) `frontend/app.js`

1. First lines get page elements by `id`.
2. Signature constants:
   - `0x095ea7b3` = `approve(...)`
   - `0x23b872dd` = `transferFrom(...)`
3. `MAX_UINT256` means biggest possible token amount (unlimited style).
4. `setLight(status)` clears old light, then turns on one light.
5. `isEthereumAddressValid(address)` uses ethers to check address format.
6. `getWalletNetworkChainId()`:
   - checks if wallet exists,
   - asks wallet to connect,
   - reads current chain ID.
7. `analyzeDangerousAction(action)` checks risky contract action patterns:
   - `transferFrom` -> warning,
   - `approve` with max uint -> danger,
   - unknown signature -> warning,
   - else -> safe in this simple demo.
8. Button click handler does checks in order:
   - validate address,
   - read selected network,
   - read wallet network,
   - compare both networks,
   - run demo dangerous-action check,
   - show safe/warning/danger message.
9. `window.SafeTxEducation = ...` exposes helper functions for learning in browser console.

### Required Messages Used
- `✅ Safe to proceed`
- `⚠️ Wrong network selected`
- `❌ Invalid address – check again`

## 4) `contracts/SafeApprovalDemo.sol`

1. `pragma solidity ^0.8.20;` sets compiler version family.
2. `interface IERC20` defines only `approve` function we need.
3. `SafeApprovalDemo` is educational contract.
4. `event ApprovalStyleUsed(...)` writes log when function is called.

### `safeApproveExact(...)` (safer example)
- Checks token/spender are not empty addresses.
- Checks amount is greater than zero.
- Calls `approve` with exact amount only.
- Emits event with style `SAFE_EXACT_AMOUNT`.

### `dangerousApproveUnlimited(...)` (danger example)
- Uses `type(uint256).max` as unlimited amount.
- This can let spender pull all tokens now and later.
- Emits event with style `DANGEROUS_UNLIMITED`.

## Safe vs Dangerous (Simple)
- **Safe idea:** give permission only for the small amount needed now.
- **Dangerous idea:** give infinite permission (all your tokens can be drained).

## Human Translation of Technical Risks
- Unlimited approval -> "You are giving permission to take ALL your tokens."
- `transferFrom` risk -> "Someone may pull coins using old permission."
- Unknown signature -> "This button does something we do not fully recognize."

> Testnet use only. This project is for education/demo, not production security.
