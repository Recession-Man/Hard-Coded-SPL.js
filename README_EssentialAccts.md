
# Locating Essential Token Information on Solscan

To run this bot successfully, you’ll need to manually input several key pieces of token information. The first two—Token Mint Address and SOL (Solana)—are likely familiar, but the next three are where beginners often get lost. This guide will help you locate the required details on Solscan and input them correctly into the bot.

## 1. Token Mint Address (Your Token)

This is the address of the SPL token you’re swapping for.

- **Why It's Familiar**: This is the token you’re interested in trading. You’ve likely already interacted with it in your wallet or through a DEX (Decentralized Exchange).
- **Where to Find**: Search for your token on Solscan, then locate the Mint Address under the token details.
- **Where to Input**: In the bot code, replace:

```javascript
const TOKEN_MINT_ADDRESS = new PublicKey('...');
```

## 2. SOL (Base Token for Swaps)

The default token for swapping is SOL (Solana’s native token).

- **Why It's Familiar**: SOL is the base token for most trades, and you likely already know its role as Solana’s native asset.
- **Where to Find**: This is predefined in the bot as `So11111111111111111111111111111111111111112`, which is the public key for SOL.
- **Where to Input**: In the bot code, the SOL mint is already provided, but it can be adjusted if needed:

```javascript
const BASE_TOKEN_MINT_ADDRESS = new PublicKey('So11111111111111111111111111111111111111112');
```

## Next Steps: The More Complex Accounts

The next three pieces of information are the ones where beginners often get confused. These relate to the token pool and its mechanics on Solana. These are critical to ensure the bot interacts with the correct pool and performs swaps correctly.

## 3. Pool Authority

- **What Is It?**: This is the account that controls the token swap pool. Think of it as the "manager" of the pool that allows your tokens to be swapped.
- **Where to Find**: On Solscan, search for your token pool (you can often find this linked from the token’s Solscan page), and under Pool Details, look for Authority.
- **Where to Input**: In the bot code, replace:

```javascript
const POOL_AUTHORITY = new PublicKey('...');
```

## 4. Pool Source Address

- **What Is It?**: This is the account that holds the tokens you're swapping from (either SOL or your token). The bot needs this to know where to take the input tokens from.
- **Where to Find**: In the pool details on Solscan, look for the Source Address.
- **Where to Input**: In the bot code, replace:

```javascript
const POOL_SOURCE = new PublicKey('...');
```

## 5. Pool Destination Address

- **What Is It?**: This is the account that receives the tokens you're swapping to (either SOL or the token you're acquiring). The bot needs this to complete the swap.
- **Where to Find**: In the pool details on Solscan, look for the Destination Address.
- **Where to Input**: In the bot code, replace:

```javascript
const POOL_DESTINATION = new PublicKey('...');
```

## 6. Pool Fee Account

- **What Is It?**: This account is where the swap fees are collected. Every swap incurs a small fee, and this account handles that.
- **Where to Find**: In the pool details, you’ll see Fee Account under the account list.
- **Where to Input**: In the bot code, replace:

```javascript
const POOL_FEE_ACCOUNT = new PublicKey('...');
```

## Summary of Input Locations in the Bot

Once you have located all these values on Solscan, input them into your bot code at the following locations:

- **Token Mint Address**: `const TOKEN_MINT_ADDRESS = new PublicKey('...');`
- **SOL Address**: `const BASE_TOKEN_MINT_ADDRESS = new PublicKey('So11111111111111111111111111111111111111112');`
- **Pool Authority**: `const POOL_AUTHORITY = new PublicKey('...');`
- **Pool Source Address**: `const POOL_SOURCE = new PublicKey('...');`
- **Pool Destination Address**: `const POOL_DESTINATION = new PublicKey('...');`
- **Pool Fee Account**: `const POOL_FEE_ACCOUNT = new PublicKey('...');`

By following these steps, even first-time users can confidently gather the necessary data and input it into the bot without needing outside help. This process, often seen as a steep learning curve, becomes approachable and accessible for anyone starting with token swapping on Solana.
