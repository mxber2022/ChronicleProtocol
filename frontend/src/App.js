import './App.css';
import Nav from './components/Nav/Nav';
import Oracle from './components/Oracle/Oracle';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia, mantleTestnet } from 'wagmi/chains';

import { publicProvider } from 'wagmi/providers/public';

const chains = [sepolia, mantleTestnet];
const projectId = '59198889d7df78b39ea70d871d0ec131';

const { publicClient } = configureChains(
  chains, 
  [publicProvider()]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains)


function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Nav/>
        <Oracle/>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}

export default App;
