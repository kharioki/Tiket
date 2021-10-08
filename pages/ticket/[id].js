import Head from 'next/head';

import { TicketCard } from "../../components/TicketCard";

export default function TicketPage() {
  return (
    <div>
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex w-full justify-items-center items-center">
        <TicketCard id={1} />
      </div>
    </div>
  );
}