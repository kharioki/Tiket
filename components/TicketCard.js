import { format } from 'date-fns';
import { ERC20_DECIMALS } from '../utils/methods';
import { SwagCard } from './SwagCard';

export function TicketCard({ ticket, address, showModal, items, purchaseItem }) {

  if (!ticket) {
    return <div className="font-bold">Loading...</div>;
  }

  return (
    <div className="bg-secondary rounded-md shadow-lg m-2 md:m-10 flex flex-row flex-wrap justify-between w-full lg:w-2/3 h-2/3 xl:h-2/3 justify-items-center">
      <div className="flex-1 py-6 px-6 bg-gradient-to-b sm:bg-gradient-to-r from-primary via-primary rounded-md md:w-1/2">
        <img src={ticket.image} className="w-full rounded-md object-cover" />
        <div className="mt-4 flex justify-center items-center w-full">
          {ticket.owner === address && (
            <button
              className="border-primary sm:border-secondary border-2 hover:border-primary text-secondary font-md py-2 px-4 rounded-md"
              onClick={() => showModal()}
            >
              Add Swag / Merchandise
            </button>
          )}
        </div>
      </div>
      <div className="px-6 py-2 sm:py-6 w-full md:w-1/2">
        <div className="mt-2 sm:mt-8">
          <h3 className="text-2xl text-yellow-900 text-left font-bold">{ticket.name}</h3>
          <p className="text-sm text-gray-500 mt-2">{ticket.venue}</p>
          <p className="text-sm text-yellow-900 mt-2">{format(new Date(ticket.date), 'EEE, MMM dd yyyy')}, {ticket.time}</p>
          <p className="text-sm text-gray-500 mt-2">Tickets sold: <strong className="text-yellow-800 text-md">{ticket.ticketsSold}</strong></p>
          <p className="text-sm text-gray-500 mt-2">Available tickets: <strong className="text-yellow-800 text-md">{ticket.totalAvailable}</strong></p>
        </div>
        <div className="mt-4 py-2 border-b border-yellow-900">
          <h1 className="text-3xl text-yellow-900 font-bold">{ticket.price.shiftedBy(-ERC20_DECIMALS).toFixed(2)} cUSD</h1>
        </div>
        <div className="my-3 py-4 border-b border-yellow-900">
          <span className="text-sm text-gray-500">{ticket.details}</span>
        </div>

        <div className="block w-full items-center">
          <p>Merch / Swag Items</p>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8">
            {items.length ? (
              items.map((item, index) => (
                <SwagCard key={index} index={index} item={item} buyItem={purchaseItem} />
              ))
            ) : (
              <div className="text-center">No items added yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
