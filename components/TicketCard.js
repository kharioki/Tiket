import { format } from 'date-fns';
import { tickets } from '../utils/tickets';

export function TicketCard({ id, showModal }) {
  const ticket = tickets[1];
  return (
    <div className="bg-secondary rounded-md shadow-lg m-2 md:m-10 flex flex-row flex-wrap justify-between w-full lg:w-2/3 h-2/3 xl:h-2/3 justify-items-center">
      <div className="flex-1 py-6 px-6 bg-gradient-to-b sm:bg-gradient-to-r from-primary via-primary rounded-md md:w-1/2">
        <img src={ticket.image} className="w-full rounded-md object-cover" />
        <div className="mt-4 flex justify-center items-center w-full">
          <button
            className="border-primary sm:border-secondary border-2 hover:border-primary text-secondary font-md py-2 px-4 rounded-md"
            onClick={() => showModal()}
          >
            Add Swag / Merchandise
          </button>
        </div>
      </div>
      <div className="px-6 py-2 sm:py-6 w-full md:w-1/2">
        <div className="mt-2 sm:mt-8">
          <h3 className="text-2xl text-yellow-900 text-left font-bold">{ticket.name}</h3>
          <p className="text-sm text-gray-500">{ticket.venue}</p>
          <p className="text-sm text-yellow-900">{format(new Date(ticket.date), 'EEE, MMM dd')}, {ticket.time}</p>
        </div>
        <div className="mt-4 py-2 border-b-2 border-yellow-900">
          <h1 className="text-3xl text-yellow-900 font-bold">${ticket.price}</h1>
        </div>
        <div className="my-3 py-4 border-b-2 border-yellow-900">
          <span className="text-sm text-gray-500">{ticket.description}</span>
        </div>

        <div className="flex justify-between items-center">
          <p>Merch / Swag</p>
        </div>
      </div>
    </div>
  );
}