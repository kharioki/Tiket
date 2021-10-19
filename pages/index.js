import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import { Banner } from '../components/Banner';
import { Cart } from '../components/Cart';
import { Footer } from '../components/Footer';
import { getAllTickets, createNewTicket, buyTicket } from '../utils/methods';

export default function HomePage(props) {
  const { showCart, handleCloseCart, contract, kit, approve, cart, cartItems, getCart } = props;
  const [showModal, setShowModal] = useState(false);
  const [ticketsList, setTicketsList] = useState([]);

  // fetch all tickets
  const getTickets = () => {
    let allTickets = getAllTickets(contract);
    allTickets.then(tickets => {
      setTicketsList(tickets);
    });
  }

  // create a ticket
  const createTicket = (ticket) => {
    createNewTicket(contract, ticket, kit);
    // refetch tickets
    getTickets();
    // close modal
    setShowModal(false);
  }

  //buying a ticket
  const purchaseTicket = (index, price, id) => {
    buyTicket(contract, index, price, id, kit, approve);
    // refetch tickets
    getTickets();
    // refetch cart
    getCart();
  }

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (contract) {
      getTickets();
    }
  }, [contract]);

  return (
    <div className="flex flex-1 flex-col min-h-screen py-2 font-mono">
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-full flex-1 px-2 sm:px-12 xl:px-24 sm:py-6 text-center">
        <Banner handleShowModal={handleShowModal} />
        <div className="w-full mb-2 md:px-4 lg:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {ticketsList.map((ticket, index) => (
              <EventCard key={index} index={index} ticket={ticket} purchaseTicket={purchaseTicket} />
            ))}
          </div>
        </div>
        {showCart && <Cart handleCloseCart={handleCloseCart} cart={cart} contract={contract} cartItems={cartItems} />}
        {showModal && <Modal handleClose={handleCloseModal} createTicket={createTicket} />}
      </main>
      <Footer />
    </div>
  )
}
