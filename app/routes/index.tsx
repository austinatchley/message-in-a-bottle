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

        <div className="flex flex-col justify-center w-full h-full sm:mt-20">
          <div className="mx-auto text-slate-800">
            <Link
              to="/boards"
              className="p-20 text-center rounded-md border hover:shadow-inner bg-gradient-to-bl from-yellow-300 to-orange-300 py-3 text-title font-medium shadow-sm hover:bg-blue-100 sm:w-full"
            >
              Enter
            </Link>
          </div>
        </div>
    </main>
  );
}
