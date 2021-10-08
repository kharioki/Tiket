import React, { useState } from 'react';
import Head from 'next/head';

import { tickets } from '../utils/tickets';
import { EventCard } from '../components/EventCard';
import { Modal } from '../components/Modal';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-1 flex-col min-h-screen py-2 font-mono">
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between w-full border-b border-primary p-4">
        <div className="flex justify-between items-center h-8 md:h-12 p-2 md:p-4">
          <img className="w-8 md:w-12 h-8 md:h-12 object-cover mr-2 md:mr-4" src="/images/icon-50.png" />
          <h1 className="font-bold text-primary text-2xl md:text-3xl px-2 md:px-6 border-l-2 border-dashed border-primary">
            Tiket
          </h1>
        </div>
        <button
          className="p-2 md:p-4 text-primary text-xs sm:text-md border-primary border-2 hover:text-white hover:bg-primary tracking-wider rounded-full"
          onClick={() => handleShowModal()}
        >
          Create Tickets
        </button>
      </nav>

      <main className="flex flex-col items-center w-full flex-1 sm:px-12 xl:px-24 sm:py-6 text-center">
        <div className="w-full mb-2 px-2 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {tickets.map((ticket, index) => (
              <EventCard key={index} ticket={ticket} />
            ))}
          </div>
        </div>

        {showModal && <Modal handleClose={handleCloseModal} />}
      </main>

      <footer className="flex items-center justify-center w-full h-8 md:h-16 border-t">
        <a
          className="flex items-center justify-center"
          href="https://kharioki.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{' '}
          <span className="font-bold ml-2 hover:text-primary">Kharioki</span>
        </a>
      </footer>
    </div>
  )
}
