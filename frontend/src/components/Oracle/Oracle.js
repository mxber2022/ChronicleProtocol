import "./Oracle.css";
import { useAccount, useConnect, useEnsName } from 'wagmi';
import { ethers } from 'ethers';

function Oracle () {
    const Lprovider = new ethers.providers.JsonRpcProvider("https://sepolia.infura.io/v3/e96abcff2f494bcd81fadc53c8fd6ac9");
    const { address, isConnected } = useAccount();
    const { provider } = useConnect();

    return(
        <>
            <h1>Oracle Data</h1>
        </> 
    );
}

export default Oracle;