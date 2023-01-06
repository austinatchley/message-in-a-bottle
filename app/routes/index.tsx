import { Link } from "@remix-run/react";

export default function Index() {
  return (
    <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <img
                className="h-full w-full object-cover"
                src="https://user-images.githubusercontent.com/1500684/158276320-c46b661b-8eff-4a4d-82c6-cf296c987a12.jpg"
                alt="BB King playing blues on his Les Paul guitar"
              />
              <div className="absolute inset-0 bg-[color:rgba(27,167,254,0.5)] mix-blend-multiply" />
            </div>
            <div className="relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
                <span className="block uppercase text-blue-500 drop-shadow-md">
                  Message in a Bottle
                </span>
              </h1>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {(
                  <Link
                    to="/boards"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    View All Boards
                  </Link>
                )}
              </div>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {(
                  <Link
                    to="/notes"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-blue-700 shadow-sm hover:bg-blue-50 sm:px-8"
                  >
                    View All Notes
                  </Link>
                )}
              </div>
              <a href="https://remix.run">
                <img
                  src="https://user-images.githubusercontent.com/1500684/158298926-e45dafff-3544-4b69-96d6-d3bcc33fc76a.svg"
                  alt="Remix"
                  className="mx-auto mt-16 w-full max-w-[12rem] md:max-w-[16rem]"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
