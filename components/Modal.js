import React from 'react';
import BigNumber from 'bignumber.js';

import { ERC20_DECIMALS } from '../utils/methods';

import useForm from '../utils/useForm';

export function Modal({ handleClose, createTicket }) {
  const { inputs, handleChange, clearForm } = useForm({
    image: '',
    name: '',
    details: '',
    date: '',
    venue: '',
    time: '',
    price: 0,
    totalAvailable: 0
  });

  const handleSubmit = () => {
    const vals = {
      ...inputs,
      price: new BigNumber(inputs.price).shiftedBy(ERC20_DECIMALS).toString(),
    }
    // submit form
    createTicket(vals);
    clearForm();
  }

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true" >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">

        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="mt-3 ml-2 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <div className="flex flex-row items-center justify-between w-full border-b-2">
                <h3 className="text-md leading-6 font-medium text-gray-900" id="modal-title">
                  Create Event Tickets
                </h3>
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md hover:border-2 hover:border-primary text-gray-400 hover:text-primary focus:outline focus:text-gray-500 transition duration-150 ease-in-out"
                  onClick={() => handleClose()}
                  aria-label="Close"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-0">
                <p className="text-sm text-primary italic">
                  Add Event ticket information.
                </p>
              </div>
              <div className="mt-2 sm:mt-0">
                <form>
                  <label htmlFor="name" className="formLabel">Event Name</label>
                  <input
                    className="formInput"
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Event Name"
                    value={inputs.name}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="details" className="formLabel">Event Details</label>
                  <textarea
                    className="formInput"
                    id="details"
                    name="details"
                    rows="2"
                    placeholder="Enter event details"
                    value={inputs.details}
                    onChange={handleChange}
                  ></textarea>

                  <label htmlFor="date" className="formLabel">Date</label>
                  <input
                    className="formInput"
                    id="date"
                    name="date"
                    type="date"
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="time" className="formLabel">Time</label>
                  <input
                    className="formInput"
                    id="time"
                    name="time"
                    type="time"
                    onChange={handleChange}
                  />

                  <label htmlFor="venue" className="formLabel">Venue</label>
                  <input
                    className="formInput"
                    id="venue"
                    name="venue"
                    type="text"
                    value={inputs.venue}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="price" className="formLabel">Ticket Price</label>
                  <input
                    className="formInput"
                    id="price"
                    name="price"
                    type="number"
                    value={inputs.price}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="image" className="formLabel">Image Url</label>
                  <input
                    className="formInput"
                    id="image"
                    name="image"
                    type="text"
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="totalAvailable" className="formLabel">Total Tickets available</label>
                  <input
                    className="formInput"
                    id="totalAvailable"
                    name="totalAvailable"
                    type="number"
                    value={inputs.totalAvailable}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex">
            <button
              type="submit"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-xs font-medium text-white hover:bg-primary sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => handleSubmit()}
            >
              Create
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-red-500 shadow-sm px-4 py-2 bg-white text-xs ml-2 font-medium text-red-500 hover:bg-gray-100 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => clearForm()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
