import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from 'bignumber.js';

import '../styles/styles.css';
import Header from '../components/Header';

const ERC20_DECIMALS = 18;
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"

function MyApp({ Component, pageProps }) {
  const [showCart, setShowCart] = useState(false);
  const [balance, setBalance] = useState(null);
  const [kit, setKit] = useState(null);
  const [contract, setContract] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);

  const connectCeloWallet = async () => {
    if (window.celo) {
      try {
        await window.celo.enable();
        const web3 = new Web3(window.celo);
        let kit = newKitFromWeb3(web3);
        await setKit(kit);

        const accounts = await kit.web3.eth.getAccounts();
        const address = accounts[0];

        kit.defaultAccount = address;
        await setAccountAddress(accounts[0]);

        console.log(kit);
        console.log(accountAddress);
      } catch (error) {
        console.error(error);
      }

    } else {
      alert('Please install the Celo Chrome Extension');
    }
  };

  const getBalance = async () => {
    const totalBalance = await kit.getTotalBalance(kit.defaultAccount);
    const cUSDBalance = totalBalance.cUSD.shiftedBy(-ERC20_DECIMALS).toFixed(2);
    setBalance(cUSDBalance);
  }

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  useEffect(() => {
    connectCeloWallet();
  }, []);

  console.log(balance)
  useEffect(() => {
    if (kit && accountAddress) {
      getBalance();
    }
  }, [kit, accountAddress]);

  const allProps = { ...pageProps, showCart, handleShowCart, handleCloseCart };
  return (
    <div>
      <Header handleShowCart={handleShowCart} balance={balance} />
      <Component {...allProps} />
    </div>
  )
}

export default MyApp
