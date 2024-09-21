
# Manual-Bot for Solana SPL Token Trading

## Introduction

This repo compares Solana SDK Copilot and Degen Dev GPT, showcasing two trading bots created from identical prompts. Each bot represents a different style of answering questions and structuring code. The goal is to audit and compare both bots, with results summarized in an `audit-results.sol` file. This test will also serve as an educational tool for an API Assistant, which will be built as part of future development.

## Features

- Automates trading between SOL and Huahua Sad Panda Token.
- Randomized buy amounts between min and max values.
- Auto token account creation for missing token accounts.
- Configurable slippage and trade intervals.

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/manual-bot.git
cd manual-bot
```

Install dependencies:

```bash
npm install @solana/web3.js @solana/spl-token @solana/spl-token-swap
```

## Configuration

- Add your wallet JSON to the specified path (wallet.json).
- Modify constants (e.g., token addresses, buy/sell amounts, slippage) in the bot script.

## Usage

Start the bot:

```bash
node manual-bot.js
```

The bot will initiate its trading loop, executing randomized buys and sells.

## Purpose and Next Steps

Both bots in this repo will be audited by each GPT. Summaries and insights from the audit will be uploaded to an `audit-results.sol` file. This comparison will aid in educating the API Assistant being developed next week.

## License

MIT License
