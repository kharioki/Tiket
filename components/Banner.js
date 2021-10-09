export function Banner({ handleShowModal }) {
  return (
    <div className="bg-primary block w-full mb-4 px-2 py-2 md:px-6 rounded-md">
      <div className="flex-1 flex items-center mb-2">
        <span className="flex p-2 rounded-md bg-primary">
          <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </span>

        <p className="ml-2 text-xs sm:text-sm text-white text-left">
          Event tickets re-imagined!
          Create, sell, buy and validate tickets using blockchain technology.
        </p>
      </div>
      <div className="flex-1 flex items-center">
        <span className="flex p-2 rounded-md bg-primary">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </span>
        <p className="ml-2 text-xs sm:text-sm text-white text-left">
          Coming soon!
          Resell purchased tickets.
        </p>
      </div>
      <button
        className="p-2 md:p-4 text-white text-xs sm:text-md border-white border-2 hover:text-primary hover:bg-white tracking-wider rounded-full"
        onClick={() => handleShowModal()}
      >
        Create Tickets
      </button>
    </div>
  )
}
