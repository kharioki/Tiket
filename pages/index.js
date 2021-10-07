import Head from 'next/head'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 font-mono">
      <Head>
        <title>Tiket</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex justify-between w-full border-b border-brown-100 p-4">
        <div className="flex justify-between items-center h-12 p-4">
          <img className="w-12 h-12 object-cover mr-4" src="/images/icon-50.png" />
          <h1 className="font-bold text-3xl p-4 border-l-2 border-gray-500">
            Tiket
          </h1>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">


        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          <a
            href="https://nextjs.org/docs"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Documentation &rarr;</h3>
            <p className="mt-4 text-xl">
              Find in-depth information about Next.js features and API.
            </p>
          </a>

          <a
            href="https://nextjs.org/learn"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Learn &rarr;</h3>
            <p className="mt-4 text-xl">
              Learn about Next.js in an interactive course with quizzes!
            </p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Examples &rarr;</h3>
            <p className="mt-4 text-xl">
              Discover and deploy boilerplate example Next.js projects.
            </p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
          >
            <h3 className="text-2xl font-bold">Deploy &rarr;</h3>
            <p className="mt-4 text-xl">
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-8 sm:h-16 border-t">
        <a
          className="flex items-center justify-center"
          href="https://kharioki.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built by{' '}
          <span className="font-bold ml-2 hover:text-[#533635]">Kharioki</span>
        </a>
      </footer>
    </div>
  )
}
