const { Connection, Keypair, PublicKey } = require('@solana/web3.js');
const { performSwap, createTokenAccountIfNotExist } = require('./lib.js');
const fs = require('fs');

// Configuration Constants for Huahua Sad Panda Token
const TOKEN_MINT_ADDRESS = new PublicKey('6HZWuobpF3r853pKoCq7JFPcjF7MiDPEiVybbkvghwbT');
const BASE_TOKEN_MINT_ADDRESS = new PublicKey('So11111111111111111111111111111111111111112'); // SOL Mint
const MAX_BUY_AMOUNT = 0.05 * 1e9; // 0.05 SOL in lamports
const MIN_BUY_AMOUNT = 0.005 * 1e9; // 0.005 SOL in lamports
const SELL_PERCENTAGE = 0.99; // 99% of the token balance
const TIME_BETWEEN_TRADES = 20; // 20 seconds between trades
const SLIPPAGE = 0.5; // 0.5% slippage

// Load the wallet from a local file
const wallet = Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(fs.readFileSync('path/to/your/wallet.json', 'utf-8')))
);

// Create a connection to the Solana cluster
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

// Function to buy the SPL token using SOL
async function buyToken(amount) {
    console.log(`Buying ${amount / 1e9} SOL worth of Huahua Sad Panda Token...`);
    await performSwap({
        connection,
        wallet,
        sourceMint: BASE_TOKEN_MINT_ADDRESS,
        destinationMint: TOKEN_MINT_ADDRESS,
        amount: amount,
        slippage: SLIPPAGE,
    });
}

// Function to sell the SPL token back to SOL
async function sellToken(percentage) {
    console.log(`Selling ${percentage * 100}% of Huahua Sad Panda Token balance back to SOL...`);

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
        destinationMint: BASE_TOKEN_MINT_ADDRESS,
        amount: amountToSell,
        slippage: SLIPPAGE,
    });
}

// Function to simulate a random delay between buys
function randomDelay(min, max) {
    const delay = Math.floor(Math.random() * (max - min + 1) + min);
    return new Promise(resolve => setTimeout(resolve, delay * 1000));
}

// Trading loop function
async function tradingLoop() {
    while (true) {
        console.log('Starting a new trading cycle...');

        // Perform multiple buys with random delays
        for (let i = 0; i < 4; i++) {
            const amount = Math.random() * (MAX_BUY_AMOUNT - MIN_BUY_AMOUNT) + MIN_BUY_AMOUNT;
            await buyToken(amount);
            await randomDelay(10, 20); // Random delay between 10 to 20 seconds
        }

        // Perform the sell
        await sellToken(SELL_PERCENTAGE);

        console.log(`Waiting ${TIME_BETWEEN_TRADES} seconds before the next cycle...`);
        await new Promise(resolve => setTimeout(resolve, TIME_BETWEEN_TRADES * 1000));
    }
}

// Start the trading loop
tradingLoop().catch(err => console.error('Error in trading loop:', err));
