#!/bin/bash

# Script to print the storage layout of SelfKisser.
#
# Run via:
# ```bash
# $ script/dev/print-storage-layout.sh
# ```

echo "SelfKisser Storage Layout"
forge inspect src/SelfKisser.sol:SelfKisser storage --pretty
