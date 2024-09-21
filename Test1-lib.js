const { PublicKey, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const { TokenSwap } = require('@solana/spl-token-swap');
const { Buffer } = require('buffer');

// Hardcoded values for pool and authority
const POOL_ADDRESS = new PublicKey('4jNSvXLKDzjfKbozUfrDuL2bJtbvGEiHrRsrRzwUgJMZ'); // !!!!! Replace with actual pool address
const POOL_AUTHORITY = new PublicKey('4jNSvXLKDzjfKbozUfrDuL2bJtbvGEiHrRsrRzwUgJMZ'); // !!!!! Replace with actual authority address
const POOL_SOURCE = new PublicKey('INSERT_POOL_SOURCE_ADDRESS'); // !!!!! Replace with actual pool source address
const POOL_DESTINATION = new PublicKey('INSERT_POOL_DESTINATION_ADDRESS'); // !!!!! Replace with actual pool destination address
const POOL_FEE_ACCOUNT = new PublicKey('INSERT_POOL_FEE_ACCOUNT_ADDRESS'); // !!!!! Replace with actual pool fee account address

// Function to perform a token swap between SOL and the SPL token
async function performSwap({ connection, wallet, sourceMint, destinationMint, amount, slippage, minimumAmountOut }) {
    const transaction = new Transaction().add(
        TokenSwap.swapInstruction(
            {
                tokenSwap: POOL_ADDRESS,
                authority: POOL_AUTHORITY,
                userTransferAuthority: wallet.publicKey,
                source: await createTokenAccountIfNotExist(connection, wallet, sourceMint),
                destination: await createTokenAccountIfNotExist(connection, wallet, destinationMint),
                poolSource: POOL_SOURCE,
                poolDestination: POOL_DESTINATION,
                poolFeeAccount: POOL_FEE_ACCOUNT,
                tokenProgramId: splToken.TOKEN_PROGRAM_ID,
                amountIn: amount,
                minimumAmountOut: minimumAmountOut,
            },
            new PublicKey('SPL_Token_Swap_Program_ID_Here') // !!!!! Replace with actual Token Swap Program ID
        )
    );

    try {
        const signature = await sendAndConfirmTransaction(connection, transaction, [wallet]);
        console.log(`Swap executed successfully: ${signature}`);
    } catch (error) {
        console.error(`Swap failed: ${error}`);
    }
}

module.exports = {
    performSwap,
    createTokenAccountIfNotExist,
};
