require('dotenv').config();  // Load environment variables from .env file
const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { performSwap, createTokenAccountIfNotExist } = require('./lib.js');
const fs = require('fs');
const path = require('path');

// Constants
const TOKEN_MINT_ADDRESS = new PublicKey('HLptm5e6rTgh4EKgDpYFrnRHbjpkMyVdEeREEa2G7rf9');  // Your meme coin token mint
const BASE_TOKEN_MINT_ADDRESS = new PublicKey('So11111111111111111111111111111111111111112');  // SOL
const MAX_BUY_AMOUNT = 0.05 * 1e9;  // Maximum buy amount in lamports (0.05 SOL)
const MIN_BUY_AMOUNT = 0.005 * 1e9;  // Minimum buy amount in lamports (0.005 SOL)
const SELL_PERCENTAGE = 0.99;  // 99% of the meme coin balance
const TIME_BETWEEN_TRADES = 20;  // Time between trading cycles in seconds
const SLIPPAGE = 0.005;  // Slippage for trades (0.5%)

// Hardcode wallet file
const walletPath = path.resolve('C:\\Users\\atswo\\wallet\\new_wallet.json');
const walletData = JSON.parse(fs.readFileSync(walletPath, 'utf-8'));
const wallet = Keypair.fromSecretKey(Uint8Array.from(walletData));

// Create a connection to the Solana cluster
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Function to buy the token using SOL
async function buyToken(amount) {
    console.log(`Buying token with ${amount / 1e9} SOL...`);
    await performSwap({
        connection,
        wallet,
        sourceMint: PublicKey.default,  // SOL's default public key
        destinationMint: TOKEN_MINT_ADDRESS,
        amount: amount,
        slippage: SLIPPAGE,
        minimumAmountOut: amount * (1 - SLIPPAGE),
    });
}

// Function to sell the token back to SOL
async function sellToken(percentage) {
    console.log(`Selling token back to SOL...`);

    const tokenAccount = await createTokenAccountIfNotExist(connection, wallet, TOKEN_MINT_ADDRESS);
    const accountInfo = await connection.getTokenAccountBalance(tokenAccount);
    const balance = accountInfo.value.amount;

    const amountToSell = Math.floor(balance * percentage);

    if (amountToSell === 0) {
        console.error('No tokens to sell or calculated sell amount is zero.');
        return;
    }

    await performSwap({
        connection,
        wallet,
        sourceMint: TOKEN_MINT_ADDRESS,
        destinationMint: PublicKey.default,
        amount: amountToSell,
        slippage: SLIPPAGE,
        minimumAmountOut: amountToSell * (1 - SLIPPAGE),
    });
}

// Function to calculate random buy amount between MIN and MAX
function calculateRandomBuyAmount() {
    const randomFactor = Math.random();
    return Math.floor(MIN_BUY_AMOUNT + (MAX_BUY_AMOUNT - MIN_BUY_AMOUNT) * randomFactor);
}

// Trading loop
async function tradingLoop() {
    while (true) {
        console.log('Starting a new trading cycle...');

        // Perform multiple buys with random amounts
        for (let i = 0; i < 4; i++) {
            const randomBuyAmount = calculateRandomBuyAmount();
            await buyToken(randomBuyAmount);
            await randomDelay(10, 20);  // Random delay between 10 to 20 seconds
        }

        // Perform the sell
        await sellToken(SELL_PERCENTAGE);  // Selling 99% of the token balance

        console.log(`Waiting ${TIME_BETWEEN_TRADES} seconds before the next cycle...`);
        await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_TRADES * 1000));
    }
}

// Start the trading loop
tradingLoop().catch(err => console.error(err));

// Function to simulate a random delay between buys
function randomDelay(min, max) {
    const delay = Math.floor(Math.random() * (max - min + 1) + min);
    return new Promise(resolve => setTimeout(resolve, delay * 1000));
}
