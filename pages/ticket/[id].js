import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router'

import { TicketCard } from "../../components/TicketCard";
import { Cart } from '../../components/Cart';
import { SwagModal } from '../../components/SwagModal';
import { getTicket, getTicketItems, createTicketItem, buyTicketItem } from '../../utils/methods';

export default function TicketPage(props) {
  const { showCart, handleCloseCart, contract, accountAddress, kit, approve, getCartTicketItems } = props;
  const [showModal, setShowModal] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [items, setItems] = useState([]);

  const router = useRouter();
  const { id } = router.query
  const index = parseInt(id)

  const getTicketDetails = () => {
    let _ticket = getTicket(contract, index);
    _ticket.then(res => {
      setTicket(res);
    });
  }

  const getAllTicketItems = () => {
    let _ticketItems = getTicketItems(contract, id);
    _ticketItems.then(res => {
      setItems(res);
    });
  }

  // create a new ticket item
  const addTicketItem = (item) => {
    createTicketItem(contract, item, kit, id);
    // refetch ticket items
    getAllTicketItems();
    setShowModal(false);
  }

  // buy ticket item
  const purchaseItem = (index, price, id) => {
    buyTicketItem(contract, index, price, id, kit, approve);
    // refetch ticket items
    getAllTicketItems();
    // refetch cart items
    getCartTicketItems();
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (contract) {
      getTicketDetails();
      getAllTicketItems();
    }
  }, [contract]);

  return (
    <div>
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="block justify-items-center sm:px-2">
        <div className="flex flex-1 items-center mx-2">
          <span className="flex sm:ml-4 p-2 rounded-md bg-white">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </span>
          <p className=" text-xs sm:text-md mt-2 text-primary text-left italic">
            Tip: if you'd like to sell some promotional items, swag or merch in your event, you can add that too.
          </p>
        </div>
        <TicketCard ticket={ticket} address={accountAddress} showModal={handleShowModal} items={items} purchaseItem={purchaseItem} />
        {showCart && <Cart handleCloseCart={handleCloseCart} />}
        {showModal && <SwagModal handleClose={handleCloseModal} createTicketItem={addTicketItem} />}
      </div>
    </div>
  );
}