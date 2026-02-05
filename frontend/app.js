const checkButton = document.getElementById("checkButton");
const walletAddressInput = document.getElementById("walletAddress");
const networkSelect = document.getElementById("networkSelect");
const resultMessage = document.getElementById("resultMessage");
const riskMessage = document.getElementById("riskMessage");

const lightSafe = document.getElementById("light-safe");
const lightWarning = document.getElementById("light-warning");
const lightDanger = document.getElementById("light-danger");

const SIG_APPROVE = "0x095ea7b3";
const SIG_TRANSFER_FROM = "0x23b872dd";
const MAX_UINT256 = (2n ** 256n) - 1n;

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

function analyzeDangerousAction(action) {
  const { functionSignature, amount } = action;

  if (functionSignature === SIG_TRANSFER_FROM) {
    return {
      level: "WARNING",
      text: "This action can move tokens from someone else if permission exists.",
      childText: "Someone may pull coins using old permission. Be careful.",
    };
  }

  if (functionSignature === SIG_APPROVE && typeof amount === "bigint") {
    if (amount === MAX_UINT256) {
      return {
        level: "DANGER",
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
      level: "WARNING",
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

    const demoRisk = analyzeDangerousAction({
      functionSignature: SIG_APPROVE,
      amount: MAX_UINT256,
    });

    if (demoRisk.level === "DANGER") {
      setLight("DANGER");
      resultMessage.textContent = "⚠️ Dangerous contract action detected";
      riskMessage.textContent = demoRisk.childText;
      return;
    }

    setLight("SAFE");
    resultMessage.textContent = "✅ Safe to proceed";
    riskMessage.textContent = "Basic checks passed on address and network.";
  } catch (error) {
    setLight("DANGER");
    resultMessage.textContent = "❌ Could not complete safety check";
    riskMessage.textContent = error.message;
  }
});

window.SafeTxEducation = {
  analyzeDangerousAction,
  SIG_APPROVE,
  SIG_TRANSFER_FROM,
  MAX_UINT256,
};
