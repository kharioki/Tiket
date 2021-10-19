import React, { useState, useEffect } from 'react';
import { QRCode } from "react-qrcode-logo";
import { format } from 'date-fns';

import { ConnectButton } from './ConnectButton';
import { getCartTickets, getCartTicketItems } from '../utils/methods';

export function Cart({ handleCloseCart, cart, contract, cartItems }) {
  const [tickets, setTickets] = useState([]);
  const [ticketItems, setTicketItems] = useState([]);

  const getTickets = async () => {
    const tickets = await getCartTickets(contract, cart);
    setTickets(tickets);
  };

  const getTicketItems = async () => {
    const ticketItems = await getCartTicketItems(contract, cartItems);
    setTicketItems(ticketItems);
  };

  useEffect(() => {
    if (contract && cart) {
      getTickets();
    }
    if (contract && cartItems) {
      getTicketItems();
    }
  }, [cart, contract]);
  return (
    <div className="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="relative w-screen max-w-md">
            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
              <button
                type="button"
                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                onClick={() => handleCloseCart()}
              >
                <span className="sr-only">Close panel</span>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
              {!contract && (
                <div className="absolute inset-0 px-4 sm:px-6">
                  <ConnectButton />
                  <div className="h-full border-2 border-dashed border-gray-200" aria-hidden="true"></div>
                </div>
              )}

              {(contract && (
                <div>
                  <div className="px-4 sm:px-6 border-b-2 border-gray-100">
                    <h2 className="text-md font-medium text-gray-900" id="slide-over-title">
                      My Purchased Tickets
                    </h2>
                  </div>
                  <div className="mt-6 relative px-4 sm:px-6 mb-6">
                    {cart && cart.length === 0 ? (
                      <div>
                        <p className="text-center text-red-300 text-sm">No tickets bought</p>
                      </div>
                    ) : (
                      <div>
                        {tickets.map((ticket, index) => (
                          <div key={index} className="mt-6">
                            <div className="flex items-center justify-between border shadow-lg border-primary rounded-md px-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <img className="h-16 w-16 sm:h-20 sm:w-20 rounded-md object-cover" src={ticket.image} alt={ticket.name} />
                                </div>
                                <div className="ml-4 text-left">
                                  <div className="text-sm font-bold leading-5 text-yellow-900">{ticket.name}</div>
                                  <div className="mt-1 text-sm leading-5 text-gray-500">Venue: {ticket.venue}</div>
                                  <div className="mt-1 text-sm leading-5 text-gray-700">Date: {format(new Date(ticket.date), 'EEE,MMM dd yyyy')}</div>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <span className="inline-flex rounded-md shadow-sm">
                                  <QRCode
                                    value={ticket.createdAt}
                                    size={64}
                                    includeMargin={false}
                                    bgColor="#FFFFFF"
                                    fgColor="#533635"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="px-4 sm:px-6 border-b-2 border-gray-100">
                    <h2 className="text-md font-medium text-gray-900" id="slide-over-title">
                      My Purchased Ticket Items
                    </h2>
                  </div>
                  <div className="mt-6 relative px-4 sm:px-6">
                    {cartItems && cartItems.length === 0 ? (
                      <div>
                        <p className="text-center text-red-300 text-sm">No tickets items bought</p>
                      </div>
                    ) : (
                      <div>
                        {ticketItems.map((ticketItem, index) => (
                          <div key={index} className="mt-6">
                            <div className="flex items-center justify-between border shadow-lg border-primary rounded-md px-2">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">
                                  <img className="h-16 w-16 sm:h-20 sm:w-20 rounded-md object-cover" src={ticketItem.image} alt={ticketItem.name} />
                                </div>
                                <div className="ml-4 text-left">
                                  <div className="text-sm font-bold leading-5 text-yellow-900">{ticketItem.name}</div>
                                </div>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <span className="inline-flex rounded-md shadow-sm">
                                  <QRCode
                                    value={ticketItem.owner}
                                    size={64}
                                    includeMargin={false}
                                    bgColor="#FFFFFF"
                                    fgColor="#533635"
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
