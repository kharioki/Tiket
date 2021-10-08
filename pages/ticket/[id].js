import Head from 'next/head';

import { TicketCard } from "../../components/TicketCard";
import { Cart } from '../../components/Cart';

export default function TicketPage(props) {
  const { showCart, handleCloseCart } = props;

  return (
    <div>
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full justify-items-center items-center">
        <TicketCard id={1} />
        {showCart && <Cart handleCloseCart={handleCloseCart} />}
      </div>
    </div>
  );
}