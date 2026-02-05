// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function approve(address spender, uint256 amount) external returns (bool);
}

/// @title SafeApprovalDemo
/// @notice Testnet-only educational contract. Do NOT use this in production.
contract SafeApprovalDemo {
    event ApprovalStyleUsed(address token, address spender, uint256 amount, string style);

    /// @notice Safer pattern: approve only what is needed for one operation.
    /// @dev Example: approve 10 tokens, not infinite tokens.
    function safeApproveExact(address token, address spender, uint256 exactAmount) external {
        require(token != address(0), "token is zero address");
        require(spender != address(0), "spender is zero address");
        require(exactAmount > 0, "amount must be > 0");

        bool ok = IERC20(token).approve(spender, exactAmount);
        require(ok, "approve failed");

        emit ApprovalStyleUsed(token, spender, exactAmount, "SAFE_EXACT_AMOUNT");
    }

    /// @notice Dangerous pattern: approve maximum uint256 (unlimited approval).
    /// @dev This means spender can pull all your current and future tokens.
    function dangerousApproveUnlimited(address token, address spender) external {
        require(token != address(0), "token is zero address");
        require(spender != address(0), "spender is zero address");

        uint256 unlimited = type(uint256).max;
        bool ok = IERC20(token).approve(spender, unlimited);
        require(ok, "approve failed");

        emit ApprovalStyleUsed(token, spender, unlimited, "DANGEROUS_UNLIMITED");
    }
}
