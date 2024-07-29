import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import ERC20Token from './contracts/ERC20Token.json';
import UniswapV2Pair from './contracts/UniswapV2Pair.json';
import './App.css';

function App() {
    const [account, setAccount] = useState('');
    const [token, setToken] = useState(null);
    const [pair, setPair] = useState(null);
    const [tokenBalance, setTokenBalance] = useState('0');

    useEffect(() => {
        loadBlockchainData();
    }, []);

    const loadBlockchainData = async () => {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const networkId = await web3.eth.net.getId();
        const tokenData = ERC20Token.networks[networkId];
        if (tokenData) {
            const token = new web3.eth.Contract(ERC20Token.abi, tokenData.address);
            setToken(token);
            const balance = await token.methods.balanceOf(accounts[0]).call();
            setTokenBalance(balance);
        }

        const pairData = UniswapV2Pair.networks[networkId];
        if (pairData) {
            const pair = new web3.eth.Contract(UniswapV2Pair.abi, pairData.address);
            setPair(pair);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Uniswap DApp</h1>
                <p>Account: {account}</p>
                <p>Token Balance: {tokenBalance}</p>
                {/* Add further UI elements here */}
            </header>
        </div>
    );
}

export default App;
