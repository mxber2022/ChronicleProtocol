# Management

This document describes how to manage deployed `SelfKisser` instances.

## Table of Contents

- [Management](#management)
  - [Table of Contents](#table-of-contents)
  - [Environment Variables](#environment-variables)
  - [Functions](#functions)
    - [`ISelfKisser::selfKiss caller`](#iselfkisserselfkiss-caller)
    - [`ISelfKisser::selfKiss who`](#iselfkisserselfkiss-who)
    - [`ISelfKisser::support`](#iselfkissersupport)
    - [`ISelfKisser::unsupport`](#iselfkisserunsupport)
    - [`ISelfKisser::kill`](#iselfkisserkill)
    - [`IAuth::rely`](#iauthrely)
    - [`IAuth::deny`](#iauthdeny)

## Environment Variables

The following environment variables must be set for all commands:

- `RPC_URL`: The RPC URL of an EVM node
- `PRIVATE_KEY`: The private key to use
- `SELF_KISSER`: The `SelfKisser` instance to manage

Note that an `.env.example` file is provided in the project root. To set all environment variables at once, create a copy of the file and rename the copy to `.env`, adjust the variable's values', and run `source .env`.

To easily check the environment variables, run:

```bash
$ env | grep -e "RPC_URL" -e "PRIVATE_KEY" -e "SELF_KISSER"
```

## Functions

### `ISelfKisser::selfKiss caller`

Set the following environment variables:

- `ORACLE`: The oracle to be kissed on

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "selfKiss(address,address)" $SELF_KISSER $ORACLE) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `ISelfKisser::selfKiss who`

Set the following environment variables:

- `ORACLE`: The oracle to be kissed on
- `WHO`: The address to kiss

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "selfKiss(address,address,address)" $SELF_KISSER $ORACLE $WHO) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `ISelfKisser::support`

Set the following environment variables:

- `ORACLE`: The oracle to support

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "support(address,address)" $SELF_KISSER $ORACLE) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `ISelfKisser::unsupport`

Set the following environment variables:

- `ORACLE`: The oracle to unsupport

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "unsupport(address,address)" $SELF_KISSER $ORACLE) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `ISelfKisser::kill`

> **Warning**
>
> This command renders the SelfKisser instance useless and is **irreversible**.

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "kill(address)" $SELF_KISSER) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `IAuth::rely`

Set the following environment variables:

- `WHO`: The address to grant auth to

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "rely(address,address)" $SELF_KISSER $WHO) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `IAuth::deny`

Set the following environment variables:

- `WHO`: The address to renounce auth from

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "deny(address,address)" $SELF_KISSER $WHO) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `IToll::kiss`

Set the following environment variables:

- `WHO`: The address to grant toll to

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "kiss(address,address)" $SELF_KISSER $WHO) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```

### `IToll::diss`

Set the following environment variables:

- `WHO`: The address to renounce toll from

Run:

```bash
$ forge script \
    --private-key $PRIVATE_KEY \
    --broadcast \
    --rpc-url $RPC_URL \
    --sig $(cast calldata "diss(address,address)" $SELF_KISSER $WHO) \
    -vvv \
    script/SelfKisser.s.sol:SelfKisserScript
```
