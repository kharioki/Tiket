import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import { Banner } from '../components/Banner';
import { Cart } from '../components/Cart';
import { Footer } from '../components/Footer';
import { getAllTickets, createNewTicket } from '../utils/methods';

export default function HomePage(props) {
  const { showCart, handleCloseCart, contract, kit, cart, cartItems, getCart, getBalance, buyTicket } = props;
  const [showModal, setShowModal] = useState(false);
  const [ticketsList, setTicketsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch all tickets
  const getTickets = () => {
    let allTickets = getAllTickets(contract);
    allTickets.then(tickets => {
      setTicketsList(tickets);
    });
  }
  // console.log(ticketsList);

  // create a ticket
  const createTicket = async (ticket) => {
    await createNewTicket(contract, ticket, kit);
    // close modal
    setShowModal(false);
    // refetch tickets
    getTickets();
  }

  //buying a ticket
  const purchaseTicket = async (index, price, id) => {
    setLoading(true);
    await buyTicket(price, index, id);
    // refetch tickets
    setLoading(false);
    getTickets();
    // refetch cart
    getCart();
    // refetch balance
    getBalance();
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
        {loading && (
          <button type="button" className="bg-white border-primary flex mb-2" disabled>
            <svg className="animate-spin w-6 h-6 mr-3 text-yellow-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Processing purchase
          </button>
        )}
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
