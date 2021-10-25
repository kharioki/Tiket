import { useRouter } from 'next/router'
import { format } from 'date-fns';

import { ERC20_DECIMALS } from '../utils/methods';

export function EventCard({ index, ticket, purchaseTicket }) {
  const router = useRouter()

  const purchase = () => {
    const id = index.toString();
    const price = ticket.price / 1000000000000000000;

    // // confirm purchase
    // confirm('Are you sure you want to purchase this ticket?') &&
    purchaseTicket(index, price, id);
  }

  const sold = parseInt(ticket.ticketsSold);
  const total = parseInt(ticket.totalAvailable);
  return (
    <div className="bg-secondary rounded-md shadow-lg relative">
      <div className="py-6 px-12 bg-gradient-to-b from-primary via-primary rounded-t-md">
        <img src={ticket.image} className="w-full h-60 md:h-72 object-cover bottom-2 translate-y-10" />
        <h2 className="absolute transform -rotate-90 left-6 top-24 -translate-x-24 text-white text-3xl font-light">
          {format(new Date(ticket.date), 'EEE,MMM dd')}
        </h2>
        {sold > 0 && sold < total ? <p className="absolute bg-white text-primary transform rotate-3 -top-3 -right-1">{sold} sold</p> : null}
        {sold > 0 && sold < total ? <p className="absolute bg-white text-primary transform rotate-3 top-3 -right-1">{total} remaining</p> : null}
        {sold === total && <p className="absolute bg-white text-primary transform rotate-3 -top-3 -right-1">Sold Out</p>}

      </div>
      <div className="mt-8 px-6">
        <span className="text-xs text-gray-500 text-right">{ticket.venue}, {ticket.time}</span>
      </div>
      <div className="m-2">
        <span className="text-primary text-lg font bold">{ticket.name}</span>
      </div>
      <div className="m-4 border-t-2 border-b-2 border-primary h-16 flex flex-row">
        <div className="flex-1 border-r-2 border-primary p-2 justify-center items-center">
          <button
            className="p-2 hover:text-white hover:bg-primary tracking-wider"
            onClick={() => purchase()}
            disabled={sold === total}
          >
            Buy ticket
          </button>
        </div>
        <div className="flex-3 ml-2 p-4 justify-center items-center">
          <p className="oldstyle-nums">{ticket.price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD</p>
        </div>
      </div>
      <div className="m-4 border-t-2 border-b-2 border-primary h-16 flex justify-center items-center">
        <div className="flex-1 p-2 justify-center items-center">
          <button
            className="p-2 hover:text-white hover:bg-primary tracking-wider"
            onClick={() => {
              router.push({
                pathname: `/ticket/${index}`,
                query: { id: index },
              })
            }}
          >
            View Ticket Details &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}
