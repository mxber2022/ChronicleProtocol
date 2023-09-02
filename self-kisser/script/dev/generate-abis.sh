#!/bin/bash

# Script to generate SelfKisser's ABI.
# Saves the ABI in fresh abis/ directory.
#
# Run via:
# ```bash
# $ script/dev/generate-abis.sh
# ```

rm -rf abis/
mkdir abis

echo "Generating SelfKisser's ABI"
forge inspect src/SelfKisser.sol:SelfKisser abi > abis/SelfKisser.json
