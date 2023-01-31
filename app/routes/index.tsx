import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="min-h-screen bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <div className="container mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col basis-1/2 w-full md:w-2/5 justify-center items-start text-center md:text-left md:j-96 lg:h-112 xl:h-136">
          <div className="ml-2 bg-zinc-800">
            <h1 className="text-center text-2xl tracking-tight sm:text-2xl lg:text-3xl">
              <div className="min-w-full py-2 rounded bg-zinc-700 flex justify-left">
                <div className="pl-2 text-red-400">
                  o
                </div>
                <div className="pl-2 text-lime-400">
                  o
                </div>
                <div className="pl-2 text-yellow-400">
                  o
                </div>
              </div>
              <div className="rounded text-yellow-500 font-accent text-6xl">
                <div className="pl-4 pr-40 pt-4 pb-64">
                  message_in_a_bottle_
                </div>
              </div>
            </h1>
          </div>
        </div>

        <div className="w-full basis-1/4 md:w-3/5 py-6 flex flex-col bg-zinc-800 rounded justify-center md:min-h-full">
          <div className="mx-auto mt-11 max-w-sm text-slate-900 sm:flex sm:max-w-none sm:justify-center pb-8">
            {(
              <Link
                to="/boards"
                className="flex items-center justify-center rounded-md border border-transparent bg-yellow-400 px-5 py-3 text-base font-medium shadow-sm hover:bg-blue-100 sm:px-8"
              >
                Landing Page
              </Link>
            )}
          </div>

          <div className="mx-auto py-6 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            {(
              <Link
                to="/admin"
                className="flex items-center justify-center rounded-md border border-transparent bg-yellow-400 px-4 py-3 text-base font-medium shadow-sm hover:bg-blue-100 sm:px-8"
              >
                Admin Portal
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
