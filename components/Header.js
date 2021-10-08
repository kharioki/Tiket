import Link from 'next/link';

export default function Header() {
  return (
    <nav className="flex justify-between w-full border-b border-primary p-4">
      <Link href="/">
        <div className="flex justify-between items-center h-8 md:h-12 p-2 md:p-4">
          <img className="w-8 md:w-12 h-8 md:h-12 object-cover mr-2 md:mr-4" src="/images/icon-50.png" />
          <h1 className="font-bold text-primary text-2xl md:text-3xl px-2 md:px-6 border-l-2 border-dashed border-primary">
            Tiket
          </h1>
        </div>
      </Link>
    </nav>
  )
}
