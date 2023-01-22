import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <div className="relative w-1/3 bg-slate-500 sm:rounded-2xl sm:pb-8 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative sm:overflow-hidden rounded-2xl">
            <div className="relative bg-slate-200 px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-2xl tracking-tight sm:text-2xl lg:text-3xl">
                <div className="block text-slate-700 pb-8 font-title font-bold">
                  message_in_a_bottle_
                </div>
              </h1>
              <div className="mx-auto mt-10 max-w-sm text-slate-900 sm:flex sm:max-w-none sm:justify-center pb-8">
                {(
                  <Link
                    to="/boards"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium shadow-sm hover:bg-blue-100 sm:px-8"
                  >
                    Landing Page
                  </Link>
                )}
              </div>

              <hr></hr>

              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
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
        </div>
      </div>
    </main>
  );
}
