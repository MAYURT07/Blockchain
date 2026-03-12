const checkButton = document.getElementById("checkButton");
const walletAddressInput = document.getElementById("walletAddress");
const networkSelect = document.getElementById("networkSelect");
const modelSelect = document.getElementById("modelSelect");
const actionSelect = document.getElementById("actionSelect");
const resultMessage = document.getElementById("resultMessage");
const riskMessage = document.getElementById("riskMessage");

const lightSafe = document.getElementById("light-safe");
const lightWarning = document.getElementById("light-warning");
const lightDanger = document.getElementById("light-danger");

const SIG_APPROVE = "0x095ea7b3";
const SIG_TRANSFER_FROM = "0x23b872dd";
const MAX_UINT256 = (2n ** 256n) - 1n;

const RISK_MODELS = {
  beginner: {
    name: "Beginner mode",
    unknownLevel: "WARNING",
    transferFromLevel: "WARNING",
    unlimitedApprovalLevel: "WARNING",
  },
  balanced: {
    name: "Balanced",
    unknownLevel: "WARNING",
    transferFromLevel: "WARNING",
    unlimitedApprovalLevel: "DANGER",
  },
  strict: {
    name: "Strict",
    unknownLevel: "DANGER",
    transferFromLevel: "DANGER",
    unlimitedApprovalLevel: "DANGER",
  },
};

function setLight(status) {
  lightSafe.classList.remove("active");
  lightWarning.classList.remove("active");
  lightDanger.classList.remove("active");

  if (status === "SAFE") lightSafe.classList.add("active");
  if (status === "WARNING") lightWarning.classList.add("active");
  if (status === "DANGER") lightDanger.classList.add("active");
}

function isEthereumAddressValid(address) {
  return ethers.isAddress(address);
}

async function getWalletNetworkChainId() {
  if (!window.ethereum) {
    throw new Error("Wallet not found. Please install MetaMask.");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const network = await provider.getNetwork();
  return Number(network.chainId);
}

function getActionFromSelection(actionKey) {
  if (actionKey === "unlimited_approve") {
    return { functionSignature: SIG_APPROVE, amount: MAX_UINT256 };
  }

  if (actionKey === "limited_approve") {
    return { functionSignature: SIG_APPROVE, amount: 1000n };
  }

  if (actionKey === "transfer_from") {
    return { functionSignature: SIG_TRANSFER_FROM };
  }

  return { functionSignature: "0xdeadbeef" };
}

function analyzeDangerousAction(action, modelKey) {
  const model = RISK_MODELS[modelKey] ?? RISK_MODELS.balanced;
  const { functionSignature, amount } = action;

  if (functionSignature === SIG_TRANSFER_FROM) {
    return {
      level: model.transferFromLevel,
      text: "This action can move tokens from someone else if permission exists.",
      childText: "Someone may pull coins using old permission. Be careful.",
    };
  }

  if (functionSignature === SIG_APPROVE && typeof amount === "bigint") {
    if (amount === MAX_UINT256) {
      return {
        level: model.unlimitedApprovalLevel,
        text: "Unlimited token approval detected.",
        childText: "You are giving permission to take ALL your tokens.",
      };
    }

    return {
      level: "SAFE",
      text: "Limited approval amount.",
      childText: "You are allowing only a set amount, not everything.",
    };
  }

  if (typeof functionSignature === "string" && functionSignature.startsWith("0x")) {
    return {
      level: model.unknownLevel,
      text: "Unknown or suspicious function signature.",
      childText: "This button does something we do not fully recognize.",
    };
  }

  return {
    level: "SAFE",
    text: "No dangerous pattern found in this basic demo.",
    childText: "Looks okay in this simple check.",
  };
}

checkButton.addEventListener("click", async () => {
  try {
    const address = walletAddressInput.value.trim();

    if (!isEthereumAddressValid(address)) {
      setLight("DANGER");
      resultMessage.textContent = "❌ Invalid address – check again";
      riskMessage.textContent = "Tip: Ethereum addresses start with 0x and have 42 characters.";
      return;
    }

    const selectedChainId = Number(networkSelect.value);
    const walletChainId = await getWalletNetworkChainId();

    if (selectedChainId !== walletChainId) {
      setLight("WARNING");
      resultMessage.textContent = "⚠️ Wrong network selected";
      riskMessage.textContent = `Wallet network is chain ID ${walletChainId}, but you selected ${selectedChainId}.`;
      return;
    }

    const selectedModel = modelSelect.value;
    const selectedAction = getActionFromSelection(actionSelect.value);
    const risk = analyzeDangerousAction(selectedAction, selectedModel);

    setLight(risk.level);
    resultMessage.textContent = `${RISK_MODELS[selectedModel].name}: ${risk.text}`;
    riskMessage.textContent = risk.childText;
  } catch (error) {
    setLight("DANGER");
    resultMessage.textContent = "❌ Could not complete safety check";
    riskMessage.textContent = error.message;
  }
});

window.SafeTxEducation = {
  analyzeDangerousAction,
  getActionFromSelection,
  RISK_MODELS,
  SIG_APPROVE,
  SIG_TRANSFER_FROM,
  MAX_UINT256,
};
