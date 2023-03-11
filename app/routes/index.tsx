import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Message in a Bottle",
  description:
    "Anonymous chat app",
});

export default function Index() {
  return (
    <main className="min-h-screen bg-landing-page-background bg-repeat-x bg-slate-800 flex flex-col justify-evenly md:items-center md:justify-center">
      <div className="max-w-3xl">
        <div className="mx-auto bg-zinc-800">
          <img src="/images/splash.png"></img>
        </div>

        <div className="flex flex-row justify-evenly w-full h-full sm:mt-20 font-medium my-8">
          <div className="mx-auto text-slate-800">
            <Link
              to="/about"
              prefetch="intent"
              className="p-20 py-4 text-center rounded-md border shadow-md shadow-amber-200/20 hover:shadow-amber-400/20 bg-slate-200 hover:bg-slate-300"
            >
              About
            </Link>
          </div>
          <div className="mx-auto text-slate-800">
            <Link
              to="/boards"
              prefetch="intent"
              className="p-20 py-4 text-center rounded-md border shadow-lg shadow-amber-300/40 hover:shadow-amber-500/60 bg-gradient-to-bl from-yellow-300 to-amber-300"
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
