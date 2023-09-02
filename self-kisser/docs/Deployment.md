# Deployment

This document describes how to deploy `Scribe` and `ScribeOptimistic` instance via _Chronicle Protocol_'s [`Greenhouse`](https://github.com/chronicleprotocol/greenhouse) contract factory.

## Environment Variables

The following environment variables must be set:

- `RPC_URL`: The RPC URL of an EVM node
- `PRIVATE_KEY`: The private key to use
- `ETHERSCAN_API_URL`: The Etherscan API URL for the Etherscan's chain instance
    - Note that the API endpoint varies per Etherscan chain instance
    - Note to point to actual API endpoint (e.g. `/api`) and not just host
- `ETHERSCAN_API_KEY`: The Etherscan API key for the Etherscan's chain instance
- `GREENHOUSE`: The `Greenhouse` instance to use for deployment
- `SALT`: The salt to deploy the `SelfKisser` instance to
    - Note to use the salt's string representation
    - Note that the salt must not exceed 32 bytes in length
    - Note that the salt should match the name of the contract deployed!
- `INITIAL_AUTHED`: The address being auth'ed on the newly deployed `Scribe` instance

Note that an `.env.example` file is provided in the project root. To set all environment variables at once, create a copy of the file and rename the copy to `.env`, adjust the variables' values, and run `source .env`.

To easily check the environment variables, run:

```bash
$ env | grep -e "RPC_URL" -e "PRIVATE_KEY" -e "ETHERSCAN_API_URL" -e "ETHERSCAN_API_KEY" -e "GREENHOUSE" -e "SALT" -e "INITIAL_AUTHED"
```

## Code Adjustments

Two code adjustments are necessary to give each deployed contract instance a unique name:

1. Adjust the `SelfKisser_COUNTER`'s name in `src/SelfKisser.sol` and remove the `@todo` comment
2. Adjust the import of the `SelfKisser_COUNTER` in `script/SelfKisser.s.sol` and remove the `@todo` comment

## Execution

The deployment process consists of two steps - the actual deployment and the subsequent Etherscan verification.

Deployment:

```bash
$ SALT_BYTES32=$(cast format-bytes32-string $SALT) && \
  forge script \
    --private-key "$PRIVATE_KEY" \
    --broadcast \
    --rpc-url "$RPC_URL" \
    --sig "$(cast calldata "deploy(address,bytes32,address)" "$GREENHOUSE" "$SALT_BYTES32" "$INITIAL_AUTHED")" \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

The deployment command will log the address of the newly deployed contract address. Store this address in the `$SELF_KISSER` environment variable and continue with the verification.

Verification:

```bash
$ forge verify-contract \
    "$SELF_KISSER" \
    --verifier-url "$ETHERSCAN_API_URL" \
    --etherscan-api-key "$ETHERSCAN_API_KEY" \
    --watch \
    --constructor-args $(cast abi-encode "constructor(address)" "$INITIAL_AUTHED") \
    src/SelfKisser.sol:"$SALT"
```
