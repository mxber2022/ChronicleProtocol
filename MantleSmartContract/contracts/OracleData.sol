// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract OracleData {
    // Struct to store cryptocurrency data
    struct CryptoData {
        uint ethPrice;
        uint btcPrice;
        uint maticPrice;
        uint opPrice;
        uint solPrice;
        uint yfiPrice;
        uint linkPrice;
    }

    // Array to store multiple sets of cryptocurrency data
    CryptoData[] public cryptoDataArray;

    // Function to add cryptocurrency data
    function addCryptoData(
        uint eth,
        uint btc,
        uint matic,
        uint op,
        uint sol,
        uint yfi,
        uint link
    ) public {
        CryptoData memory newCryptoData = CryptoData(eth, btc, matic, op, sol, yfi, link);
        cryptoDataArray.push(newCryptoData);
    }

    // Function to retrieve cryptocurrency data by index
    function getCryptoData(uint index) public view returns (
        uint ethPrice,
        uint btcPrice,
        uint maticPrice,
        uint opPrice,
        uint solPrice,
        uint yfiPrice,
        uint linkPrice
    ) {
        CryptoData storage data = cryptoDataArray[index];
        return (
            data.ethPrice,
            data.btcPrice,
            data.maticPrice,
            data.opPrice,
            data.solPrice,
            data.yfiPrice,
            data.linkPrice
        );
    }

    // Function to get the number of stored cryptocurrency data sets
    function getCryptoDataCount() public view returns (uint) {
        return cryptoDataArray.length;
    }
}