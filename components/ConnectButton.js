export function ConnectButton({ connectWallet }) {
  return (
    <button
      className="text-primary border-2 border-primary p-2 rounded-md mb-2 hover:text-white hover:bg-primary text-xs sm:text:sm"
      onClick={() => connectWallet()}
    >
      Connect Wallet
    </button>
  )
}
