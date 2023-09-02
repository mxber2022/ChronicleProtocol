## How to get your address whitelisted?

The following command is used to whitelist address

forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "selfKiss(address,address)" $SELF_KISSER $ORACLE) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript

## saves env data
source .env

## The address 0x2f459D8589FDc0e11522B3BC5501552bBa0A9e63 has beeen whitelisted to 

ETH/USD - 0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660
BTC/USD - 0x4B5aBFC0Fe78233b97C80b8410681765ED9fC29c
MATIC/USD - 0xa48c56e48A71966676d0D113EAEbe6BE61661F18
OP/USD - 0xfadF055f6333a4ab435D2D248aEe6617345A4782
SOL/USD - 0x4D1e6f39bbfcce8b471171b8431609b83f3a096D
YFI/USD - 0x0893EcE705639112C1871DcE88D87D81540D0199
LINK/USD - 0xecB89B57A60ac44E06ab1B767947c19b236760c3