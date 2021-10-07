import Head from 'next/head';

import { tickets } from '../utils/tickets';
import { EventCard } from '../components/EventCard';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col min-h-screen py-2 font-mono">
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between w-full border-b border-brown-100 p-4">
        <div className="flex justify-between items-center h-8 md:h-12 p-2 md:p-4">
          <img className="w-8 md:w-12 h-8 md:h-12 object-cover mr-4" src="/images/icon-50.png" />
          <h1 className="font-bold text-2xl md:text-3xl px-6 border-l-2 border-gray-500">
            Tiket
          </h1>
        </div>
      </nav>

      <main className="flex flex-col items-center w-full flex-1 sm:px-12 xl:px-24 sm:py-6 text-center">
        <div className="w-full mb-2 px-2 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {tickets.map((ticket, index) => (
              <EventCard key={index} ticket={ticket} />
            ))}
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-8 md:h-16 border-t">
        <a
          className="flex items-center justify-center"
          href="https://kharioki.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{' '}
          <span className="font-bold ml-2 hover:text-[#533635]">Kharioki</span>
        </a>
      </footer>
    </div>
  )
}
