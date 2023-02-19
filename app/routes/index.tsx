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
      <div className="mx-auto mt-10 bg-zinc-800">
        <img src="/images/splash.png"></img>
      </div>

      <div className="flex flex-col justify-center w-full h-full sm:mt-20 font-medium">
        <div className="mx-auto text-slate-800 my-8">
          <Link
            to="/about"
            className="p-12 text-center rounded-md border shadow-md shadow-amber-200/20 hover:shadow-amber-400/20 bg-slate-200 py-3 hover:bg-slate-300"
          >
            About
          </Link>
        </div>
        <div className="mx-auto text-slate-800 my-8">
          <Link
            to="/boards"
            className="p-20 text-center rounded-md border shadow-lg shadow-amber-300/40 hover:shadow-amber-500/60 bg-gradient-to-bl from-yellow-300 to-amber-300 py-4"
          >
            Enter
          </Link>
        </div>
      </div>
    </main>
  );
}
