
# Solana Token Trading Bot

This repository compares two GPTs, Solana SDK Copilot and Degen Dev GPT, by generating two trading bots from identical prompts. Both GPTs employ completely different styles of answering questions and conveying information. Each bot was audited and contrasted by both GPTs, with the results documented in a file named `audit-results.sol`. The purpose of this comparison is to provide insights and help educate the API Assistant that will be developed this week.

## The Solana SDK Copilot Bot

The bot created by Solana SDK Copilot is designed for token swapping between SOL and an SPL token using the Solana SPL Token Swap CLI. It features customizable trade amounts, slippage management, and variable buy/sell logic.

### Features
- **Automated Buying and Selling**: Perform trades between SOL and an SPL token with user-defined amounts.
- **Variable Buy Amounts**: Random buy amounts between minimum and maximum limits for each trade cycle.
- **Customizable Slippage**: Adjust the slippage percentage to manage price fluctuation tolerance.
- **Trading Loop**: Continuously runs buy and sell operations with a defined delay between cycles.
- **Audit and Comparison**: Results of the audit and comparison between Solana SDK Copilot and Degen Dev GPT can be found in the `audit-results.sol` file.

## Prerequisites

Ensure the following tools are installed in your environment:
- **Operating System**: Windows or Linux (adapt commands as necessary)
- **PowerShell Version**: 7.4.5 or higher
- **Node.js Version**: 20.17.0 or higher
- **npm Version**: 10.8.2 or higher
- **Solana CLI Version**: 1.18.18
- **SPL Token CLI Version**: 3.4.1
- **Network Configuration**: mainnet-beta

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-repo/solana-token-bot.git
cd solana-token-bot
```

### Step 2: Install Dependencies

In the project folder, install the necessary Node.js dependencies:

```bash
npm install @solana/web3.js @solana/spl-token @solana/spl-token-swap dotenv buffer
```

### Step 3: Wallet Setup

Ensure that your wallet file is correctly located at the path specified in `Test1-Bot.js` (default path: `C:/Users/atswo/wallet/new_wallet.json`). If you don’t have a wallet file, create one using the Solana CLI:

```bash
solana-keygen new --outfile /path/to/new_wallet.json
```

## Configuration

The bot uses hardcoded values for the token mint addresses, maximum and minimum buy amounts, slippage, and more. If needed, these values can be updated directly in the `Test1-Bot.js` file.

### Important Constants in `Test1-Bot.js`:
- `TOKEN_MINT_ADDRESS`: Mint address of the SPL token being traded.
- `BASE_TOKEN_MINT_ADDRESS`: SOL (default for buying and selling).
- `MAX_BUY_AMOUNT`: Maximum SOL amount per trade (in lamports).
- `MIN_BUY_AMOUNT`: Minimum SOL amount per trade (in lamports).
- `SELL_PERCENTAGE`: Percentage of SPL tokens to sell after each trade.
- `SLIPPAGE`: Slippage tolerance for token swaps.

## Usage

### Running the Bot

To start the bot, simply run:

```bash
node Test1-Bot.js
```

The bot will:
- Perform multiple buy trades with random amounts between the specified minimum and maximum SOL values.
- Sell 99% of the acquired tokens back to SOL.
- Continuously loop with a delay between each cycle.

### Monitoring the Bot

Logs will display buy and sell actions, including transaction details and any errors encountered during the process.

## Audit Results

The results of the comparison between Solana SDK Copilot and Degen Dev GPT are stored in the `audit-results.sol` file. Both GPTs have provided their perspectives and evaluations of each other’s work to aid in building a more comprehensive understanding of the trade-offs between their respective development approaches.

## Troubleshooting

- **Wallet Not Found**: Ensure that the path to your wallet JSON file is correct in the script. If using a `.env` setup, make sure to load the wallet path from the environment variables.
- **Solana CLI Connection Issues**: Double-check that you’re using the correct Solana RPC endpoint (e.g., https://api.mainnet-beta.solana.com).
- **Transaction Failures**: Review the slippage setting and make sure it’s appropriate for the volatility of the token you’re trading.

## License

This project is licensed under the MIT License.

## Contributing

Feel free to submit issues or pull requests to help improve the bot and contribute to the ongoing comparison between Solana SDK Copilot and Degen Dev GPT.

Happy trading! 🚀
