import React, { useState, useEffect } from 'react';
import Head from 'next/head';

import { tickets } from '../utils/tickets';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';
import { Banner } from '../components/Banner';
import { Cart } from '../components/Cart';
import { Footer } from '../components/Footer';

export default function HomePage(props) {
  const [showModal, setShowModal] = useState(false);
  const { showCart, handleCloseCart, contract } = props;
  let allTickets = [];
  const getTickets = async () => {
    const _ticketsLength = await contract.methods.getTicketsLength().call();
    const _tickets = [];
    for (let i = 0; i < _ticketsLength; i++) {
      let _ticket = new Promise(async (resolve, reject) => {
        const t = await contract.methods.getTicket(i).call();
        resolve({
          index: i,
          owner: t[0],
          name: t[1],
          date: t[2],
          venue: t[3],
          time: t[4],
          details: t[5],
          image: t[6],
          createdAt: t[7],
          price: t[8],
          totalAvailable: t[9],
          ticketsSold: t[10],
        });
      });
      _tickets.push(_ticket);
    }
    allTickets = await Promise.all(_tickets);
  }

  console.log(allTickets);

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
            {tickets.map((ticket, index) => (
              <EventCard key={index} ticket={ticket} />
            ))}
          </div>
        </div>
        {showCart && <Cart handleCloseCart={handleCloseCart} />}
        {showModal && <Modal handleClose={handleCloseModal} />}
      </main>
      <Footer />
    </div>
  )
}
