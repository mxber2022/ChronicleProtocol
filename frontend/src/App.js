import './App.css';
import Nav from './components/Nav/Nav';
import Oracle from './components/Oracle/Oracle';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, polygon } from 'wagmi/chains';

import { alchemyProvider } from 'wagmi/providers/alchemy'

const chains = [arbitrum, mainnet, polygon, goerli];
const projectId = '59198889d7df78b39ea70d871d0ec131';

const { publicClient } = configureChains(
  chains, 
  [alchemyProvider({ apiKey: '_HaCAEADifV16NSoWZ0DJ-pKt-zFOfaK' })],
  [w3mProvider({ projectId })]
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
