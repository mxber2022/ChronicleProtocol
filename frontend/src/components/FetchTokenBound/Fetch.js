import "./Fetch.css";
import { getAccount } from "@tokenbound/sdk-ethers";
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { ethers } from 'ethers';

const providesr = new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/d9e68a4d18c8455c9596b5d386af2a65");
const accountAddress = await getAccount(
    "0xD5835369d4F691094D7509296cFC4dA19EFe4618", // ERC-712 contract address
    "50913", // ERC-721 token ID
    providesr // ethers provider
);


function Fetch () {
    const { address, isConnected } = useAccount();
    const { provider } = useConnect();

    return(
        <>
            <h1>Fetch {provider}</h1>
            {console.log("provider:", accountAddress)}
        </> 
    );
}

export default Fetch;