import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:w-full md:w-1/2 lg:w-1/3 bg-slate-500 sm:rounded-2xl sm:pb-8 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative sm:overflow-hidden sm:rounded-2xl">
            <div className="relative bg-yellow-500 px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center font-body text-2xl tracking-tight sm:text-2xl lg:text-3xl">
                <div className="block text-slate-700 pb-8 font-title font-bold">
                  Admin Portal
                </div>
              </h1>
              <div className="mx-auto mt-10 max-w-sm text-slate-900 sm:flex sm:max-w-none sm:justify-center">
                {(
                  <Link
                    to="/admin/bottles"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium hover:bg-blue-50 sm:px-8"
                  >
                    View All Bottles
                  </Link>
                )}
              </div>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {(
                  <Link
                    to="/admin/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium hover:bg-blue-50 sm:px-8"
                  >
                    View All Notes
                  </Link>
                )}
              </div>

              <div className="flex justify-center mt-24">
                <hr className="w-1/2 h-1 bg-slate-300 border-0"></hr>
              </div>

              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {(
                  <Link
                    to="/"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium hover:bg-blue-50 sm:px-8"
                  >
                    Home
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
