module.exports = {
    "mantleAbi": 
    [
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "eth",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "btc",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "matic",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "op",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "sol",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "yfi",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "link",
              "type": "uint256"
            }
          ],
          "name": "addCryptoData",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "name": "cryptoDataArray",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "ethPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "btcPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maticPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "opPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "solPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "yfiPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "linkPrice",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "index",
              "type": "uint256"
            }
          ],
          "name": "getCryptoData",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "ethPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "btcPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "maticPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "opPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "solPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "yfiPrice",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "linkPrice",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "getCryptoDataCount",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
      ]
}