const { PublicKey, Transaction, sendAndConfirmTransaction } = require('@solana/web3.js');
const splToken = require('@solana/spl-token');
const { TokenSwap } = require('@solana/spl-token-swap');

// Function to create an associated token account if it doesn't exist
async function createTokenAccountIfNotExist(connection, wallet, mint) {
    const tokenAccount = await splToken.getAssociatedTokenAddress(
        mint,
        wallet.publicKey,
        true,
        splToken.TOKEN_PROGRAM_ID,
        splToken.ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const accountInfo = await connection.getAccountInfo(tokenAccount);
    if (!accountInfo) {
        const transaction = new Transaction().add(
            splToken.createAssociatedTokenAccountInstruction(
                wallet.publicKey,
                tokenAccount,
                wallet.publicKey,
                mint,
                splToken.TOKEN_PROGRAM_ID,
                splToken.ASSOCIATED_TOKEN_PROGRAM_ID
            )
        );

        await sendAndConfirmTransaction(connection, transaction, [wallet]);
        console.log(`Created token account for mint: ${mint.toString()} at ${tokenAccount.toString()}`);
    } else {
        console.log(`Token account already exists at ${tokenAccount.toString()} for mint: ${mint.toString()}`);
    }
    return tokenAccount;
}

// Function to perform a token swap
async function performSwap({ connection, wallet, sourceMint, destinationMint, amount, slippage }) {
    const poolAddress = new PublicKey('4jNSvXLKDzjfKbozUfrDuL2bJtbvGEiHrRsrRzwUgJMZ');
    const authority = new PublicKey('7uZrCifLkzK3MtxYpe7QToop1pBaZ9uV1ZrmMaLKAMUW');
    const programId = new PublicKey('SwaPpFfoK7TZmdtZbzQHoF38qxpe6q4mepct7TURn4A');

    const sourceTokenAccount = await createTokenAccountIfNotExist(connection, wallet, sourceMint);
    const destinationTokenAccount = await createTokenAccountIfNotExist(connection, wallet, destinationMint);

    const transaction = new Transaction().add(
        TokenSwap.swapInstruction(
            {
                tokenSwap: poolAddress,
                authority: authority,
                userTransferAuthority: wallet.publicKey,
                source: sourceTokenAccount,
                destination: destinationTokenAccount,
                poolSource: sourceTokenAccount,
                poolDestination: destinationTokenAccount,
                poolFeeAccount: poolAddress,
                tokenProgramId: splToken.TOKEN_PROGRAM_ID,
                amountIn: amount,
                minimumAmountOut: amount * (1 - slippage / 100), // Adjust minimum amount based on slippage
            },
            programId
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
