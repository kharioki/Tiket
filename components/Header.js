import Link from 'next/link';
import { ConnectButton } from './ConnectButton';

export default function Header({ handleShowCart, balance, connectWallet, cart, cartItems }) {
  const total = cart.length + cartItems.length;

  return (
    <nav className="flex justify-between items-center w-full border-b border-primary py-2 px-4">
      <Link href="/">
        <div className="flex justify-between items-center h-8 md:h-12 p-2 md:p-4">
          <img className="w-8 md:w-12 h-8 md:h-12 object-cover mr-2 md:mr-4" src="/images/icon-50.png" />
          <h1 className="font-bold text-primary text-2xl md:text-3xl px-2 md:px-6 border-l-2 border-dashed border-primary">
            Tiket
          </h1>
        </div>
      </Link>
      <div className="flex flex-row items-center justify-center">
        {!balance ? <ConnectButton connectWallet={connectWallet} /> : (
          <h1 className="p-2 text-primary text-xs sm:text-lg rounded-md font-bold">
            {balance}cUSD
          </h1>
        )}
        <button className="relative inline-block sm:mx-2 border-2 rounded-md border-white p-2 hover:border-primary mb-2" onClick={() => handleShowCart()}>
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span
            className="absolute top-0 right-0 px-2 py-1 text-xs font-bold leading-none text-white transform bg-primary rounded-full"
          >
            {total}
          </span>
        </button>
      </div>
    </nav>
  )
}
