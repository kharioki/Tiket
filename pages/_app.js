import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';

import tiketAbi from '../contract/tiket.abi.json';
import erc20Abi from '../contract/erc20.abi.json';

import { getPurchasedTickets, getPurchasedTicketItems } from '../utils/methods';

import '../styles/styles.css';
import Header from '../components/Header';

const ERC20_DECIMALS = 18;
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
const TiketContractAddress = "0xA1FC96b0b4D30120f39A25367732f6dC3C0a007a"

function MyApp({ Component, pageProps }) {
  const [showCart, setShowCart] = useState(false);
  const [balance, setBalance] = useState(null);
  const [kit, setKit] = useState(null);
  const [contract, setContract] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null);
  const [cart, setCart] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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
        await setAccountAddress(address);

        const _contract = new kit.web3.eth.Contract(tiketAbi, TiketContractAddress);
        await setContract(_contract);

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

  // get user tickets bought
  const getCart = async () => {
    let _cart = await getPurchasedTickets(contract, accountAddress);
    setCart(_cart);
  }

  // get user tickets items bought
  const getCartTicketItems = async () => {
    let _cartItems = await getPurchasedTicketItems(contract, accountAddress);
    setCartItems(_cartItems);
  }

  async function approve(_price) {
    const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)

    const result = await cUSDContract.methods
      .approve(TiketContractAddress, _price)
      .send({ from: kit.defaultAccount })

    // console.log(result)
    return result
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

  useEffect(() => {
    if (kit && accountAddress) {
      getBalance();
    }
  }, [kit, accountAddress]);

  useEffect(() => {
    if (contract && accountAddress) {
      getCart();
      getCartTicketItems();
    }
  }, [contract, accountAddress, balance]);

  const allProps = {
    ...pageProps,
    showCart,
    handleShowCart,
    handleCloseCart,
    contract,
    kit,
    accountAddress,
    balance,
    approve,
    cart,
    cartItems,
    getCart,
    getCartTicketItems,
    getBalance
  };
  return (
    <div>
      <Header
        handleShowCart={handleShowCart}
        balance={balance}
        connectWallet={connectCeloWallet}
        cart={cart}
        cartItems={cartItems}
      />
      <Component {...allProps} />
    </div>
  )
}

export default MyApp
