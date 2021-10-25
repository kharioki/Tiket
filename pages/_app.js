import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import BigNumber from 'bignumber.js';

import tiketAbi from '../contract/tiket.abi.json';
import erc20Abi from '../contract/erc20.abi.json';

import { getPurchasedTickets, getPurchasedTicketItems } from '../utils/methods';

import '../styles/styles.css';
import Header from '../components/Header';

const ERC20_DECIMALS = 18;
const cUSDContractAddress = "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1"
const TiketContractAddress = "0x20B1a35580B0B6d68A2D80bD008aF4003AAd2c30"

function MyApp({ Component, pageProps }) {
  const [showCart, setShowCart] = useState(false);
  const [balance, setBalance] = useState(0);
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

        // web3 events
        let options = {
          fromBlock: 0,
          address: ["0x81AC0B2059b6bda4D3F167A9f1B277C7fFe13526"],
          topics: [],
        };

        let subscription = web3.eth.subscribe("logs", options, (err, event) => {
          if (!err) console.log(event);
        });

        subscription.on('data', event => {
          if (contract) {
            getBalance()
          }
        })

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
    // const cUSDContract = new kit.web3.eth.Contract(erc20Abi, cUSDContractAddress)
    const _web3 = kit.web3
    const cUSDContract = await new _web3.eth.Contract(erc20Abi, cUSDContractAddress)

    const cost = new BigNumber(_price).shiftedBy(ERC20_DECIMALS).toString();

    // console.log(cUSDContract);
    const result = await cUSDContract.methods
      .approve(TiketContractAddress, cost)
      .send({ from: kit.defaultAccount })

    // console.log(result)
    return result
  }

  async function buyTicket(_price, _index, _id) {
    // approve cUSD price to contract
    try {
      const res = await approve(_price)
    } catch (error) {
      console.error(error)
    }

    // buy ticket
    try {
      if (contract) {
        const result = await contract.methods
          .buyTicket(_id, _index)
          .send({ from: kit.defaultAccount })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function buyTicketItem(_price, _index, _ticket) {
    // approve cUSD price to contract
    try {
      const res = await approve(_price)
    } catch (error) {
      console.error(error)
    }

    // buy ticket
    try {
      if (contract) {
        const result = await contract.methods
          .buyTicketItem(_ticket, _index)
          .send({ from: kit.defaultAccount })
      }
    } catch (error) {
      console.error(error)
    }
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
    if (kit && contract && accountAddress) {
      getCart();
      getCartTicketItems();
      getBalance();
    }
  }, [kit, contract, accountAddress, balance]);

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
    getBalance,
    buyTicket,
    buyTicketItem
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
