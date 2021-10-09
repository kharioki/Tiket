import React, { useState } from 'react';
import '../styles/styles.css';
import Header from '../components/Header';

function MyApp({ Component, pageProps }) {
  const [showCart, setShowCart] = useState(false);
  const [balance, setBalance] = useState(null);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  const allProps = { ...pageProps, showCart, handleShowCart, handleCloseCart };
  return (
    <div>
      <Header handleShowCart={handleShowCart} balance={balance} />
      <Component {...allProps} />
    </div>
  )
}

export default MyApp
