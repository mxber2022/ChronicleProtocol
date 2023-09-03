import "./Oracle.css";
import { useAccount, useConnect, useContractRead } from 'wagmi';
import { ethers } from 'ethers';
import { abi } from './abi'
import { mantleAbi } from './mantleAbi';
import { useDebounce } from 'use-debounce';
import { usePrepareContractWrite , useContractWrite} from 'wagmi';
import * as React from 'react';

function Oracle () {
    const { address, isConnected } = useAccount();
    const { provider } = useConnect();

   /* const { data, isError, isLoading } = useContractRead({
        address: '0x0893EcE705639112C1871DcE88D87D81540D0199',
        abi: abi,
        functionName: 'tryRead',
    })

    console.log(data);
*/
    const [ethx, setEthx] = React.useState('')
    const debouncedEthx = useDebounce(ethx, 500)

    const [btcx, setBtcx] = React.useState('')
    const debouncedBtcx = useDebounce(btcx, 500)

    const [maticx, setMaticx] = React.useState('')
    const debouncedMaticx = useDebounce(maticx, 500)

    const [opx, setOpx] = React.useState('')
    const debouncedOpx = useDebounce(opx, 500)

    const [solx, setSolx] = React.useState('')
    const debouncedSolx = useDebounce(solx, 500)

    const [yfix, setYfi] = React.useState('')
    const debouncedYfi = useDebounce(yfix, 500)

    const [linkx, setLinkx] = React.useState('')
    const debouncedLinkx = useDebounce(linkx, 500)

    console.log(debouncedEthx);
    console.log(debouncedBtcx);
    console.log(debouncedMaticx);
    console.log(debouncedOpx);
    console.log(debouncedSolx);
    console.log(debouncedYfi);
    console.log(debouncedLinkx);
    async function getData() {

        const myProvider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/e96abcff2f494bcd81fadc53c8fd6ac9");
        const signer = new ethers.Wallet(process.env.REACT_APP_PRIVATE_KEY, myProvider);


        const ETH_USD_CONTRACT = "0xc8A1F9461115EF3C1E84Da6515A88Ea49CA97660"
        const BTC_USD_CONTRACT = "0x4B5aBFC0Fe78233b97C80b8410681765ED9fC29c"
        const MATIC_USD_CONTRACT = "0xa48c56e48A71966676d0D113EAEbe6BE61661F18"
        const OP_USD_CONTRACT = "0xfadF055f6333a4ab435D2D248aEe6617345A4782"
        const SOL_USD_CONTRACT = "0x4D1e6f39bbfcce8b471171b8431609b83f3a096D"
        const YFI_USD_CONTRACT = "0x0893EcE705639112C1871DcE88D87D81540D0199"
        const LINK_USD_CONTRACT = "0xecB89B57A60ac44E06ab1B767947c19b236760c3"

        let CONT_ETH_USD_CONTRACT = new ethers.Contract(ETH_USD_CONTRACT, abi, signer);
        let CONT_BTC_USD_CONTRACT = new ethers.Contract(BTC_USD_CONTRACT, abi, signer);
        let CONT_MATIC_USD_CONTRACT = new ethers.Contract(MATIC_USD_CONTRACT, abi, signer);
        let CONT_OP_USD_CONTRACT = new ethers.Contract(OP_USD_CONTRACT, abi, signer);
        let CONT_SOL_USD_CONTRACT = new ethers.Contract(SOL_USD_CONTRACT, abi, signer);
        let CONT_YFI_USD_CONTRACT = new ethers.Contract(YFI_USD_CONTRACT, abi, signer);
        let CONT_LINK_USD_CONTRACT = new ethers.Contract(LINK_USD_CONTRACT, abi, signer);


        let ETHPrice = await CONT_ETH_USD_CONTRACT.tryRead();
        let BTCPrice = await CONT_BTC_USD_CONTRACT.tryRead();
        let MATICPrice = await CONT_MATIC_USD_CONTRACT.tryRead();
        let OPPrice = await CONT_OP_USD_CONTRACT.tryRead();
        let SOLPrice= await CONT_SOL_USD_CONTRACT.tryRead();
        let YFIPrice = await CONT_YFI_USD_CONTRACT.tryRead();
        let LINKPrice = await CONT_LINK_USD_CONTRACT.tryRead();
        

        console.log("ETHPrice: ",parseInt(ETHPrice[1]._hex).toString().replace(".", "").slice(0, -10)/10);
        console.log("BTCPrice: ",parseInt(BTCPrice[1]._hex).toString().replace(".", "").slice(0, -15)/10);
        console.log("MATICPrice: ",parseInt(parseInt(MATICPrice[1]._hex).toString().slice(0, -17))/10);
        console.log("OPPrice: ",parseInt(parseInt(OPPrice[1]._hex).toString().slice(0, -17))/10);
        console.log("SOLPrice: ",parseInt(parseInt(SOLPrice[1]._hex).toString().slice(0, -17))/10);
        console.log("YFIPrice: ",parseInt(YFIPrice[1]._hex).toString().replace(".", "").slice(0, -15));
        console.log("LINKPrice: ",parseInt(parseInt(LINKPrice[1]._hex).toString().slice(0, -17))/10);

        setEthx(parseInt(ETHPrice[1]._hex).toString().replace(".", "").slice(0, -10)/10);
        setBtcx(parseInt(BTCPrice[1]._hex).toString().replace(".", "").slice(0, -15)/10);
        setMaticx(parseInt(parseInt(MATICPrice[1]._hex).toString().slice(0, -17))/10);
        setOpx(parseInt(parseInt(OPPrice[1]._hex).toString().slice(0, -17))/10);
        setSolx(parseInt(parseInt(SOLPrice[1]._hex).toString().slice(0, -17))/1);
        setYfi(parseInt(YFIPrice[1]._hex).toString().replace(".", "").slice(0, -15));
        setLinkx(parseInt(parseInt(LINKPrice[1]._hex).toString().slice(0, -17))/10);
    }

    const { config,
        error: prepareError,
        isError: isPrepareError, } = usePrepareContractWrite({
        address: '0x0f76795A084241a731C7Cc481DceCDF646064912',
        abi: [
          {
            name: 'addCryptoData',
            type: 'function',
            stateMutability: 'nonpayable',
            inputs: [
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
            outputs: [],
          },
        ],
        functionName: 'addCryptoData',
        args: [parseInt(debouncedEthx), parseInt(debouncedBtcx), parseInt(debouncedMaticx), parseInt(debouncedOpx), parseInt(debouncedSolx), parseInt(debouncedYfi), parseInt(debouncedLinkx)],
        
    })
    const { data, error, isError, write  } = useContractWrite(config)

    return(
        <>
            <h1>chronicle Oracle Data</h1>
            <h1>Average Volatility for crypto basket for 1 day period</h1>
            <button onClick={getData}>Get Oracle Data</button>
            <button onClick={write}>Store on blockchain</button>
            <p>Average Volatility for 1 day period of crypto basket in comparision to percentage change of traditional finance ETF</p>
        </> 
    );
}

export default Oracle;