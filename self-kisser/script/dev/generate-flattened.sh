#!/bin/bash

# Script to generate SelfKisser's flattened contract.
# Saves the contract in fresh flattened/ directory.
#
# Run via:
# ```bash
# $ script/dev/generate-flattened.sh
# ```

rm -rf flattened/
mkdir flattened

echo "Generating flattened SelfKisser contract"
forge flatten src/SelfKisser.sol > flattened/SelfKisser.sol
