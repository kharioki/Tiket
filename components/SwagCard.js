export function SwagCard({ item }) {
  return (
    <div className="relative">
      <div className="w-full min-h-40 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-40 lg:aspect-none">
        <img
          src={item.image}
          alt={item.image}
          className="w-full h-full object-center object-cover lg:w-full lg:h-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-500">{item.name}</h3>
          <p className="mt-1 text-sm font-bold text-gray-900">{item.price} cUSD</p>
        </div>
        <button className="text-primary border-2 border-primary p-2 rounded-md mb-2 hover:bg-primary text-xs sm:text:sm">
          <p className="text-sm text-primary hover:text-white">Buy</p>
        </button>
      </div>
    </div>
  )
}
