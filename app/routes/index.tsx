import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Message in a Bottle",
  description:
    "Anonymous chat app",
});

export default function Index() {
  return (
    <main className="min-h-screen bg-landing-page-background bg-repeat-x bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <div className="container flex flex-wrap flex-col items-center">
        <div className="flex flex-col w-full justify-center items-start text-center md:text-left md:j-96 lg:h-112 xl:h-136">
          <div className="mx-auto w-2/5 mt-10 bg-zinc-800">
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
              <div className="rounded text-yellow-500 font-title text-6xl italic">
                <div className="flex flex-col space-y-4 text-right hover:text-yellow-400 pl-40 pr-4 pt-4 pb-32">
                  <div className="min-w-full">message~</div>
                  <div className="min-w-full">in~</div>
                  <div className="min-w-full">a~</div>
                  <div className="min-w-full">bottle</div>
                </div>
              </div>
            </h1>
          </div>
        </div>

        <div className="mx-auto w-3/5 py-6 flex flex-col items-center md:min-h-full">
          <div className="mt-20 w-1/4 text-slate-800 sm:flex sm:max-w-none sm:justify-center pb-8">
            <Link
              to="/boards"
              className="text-center rounded-md border hover:shadow-inner bg-gradient-to-bl from-yellow-300 to-orange-300 py-3 text-title font-medium shadow-sm hover:bg-blue-100 sm:w-full"
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
