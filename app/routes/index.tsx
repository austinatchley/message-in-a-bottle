import { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Message in a Bottle",
  description: "Anonymous chat app",
});

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col justify-evenly bg-slate-800 bg-landing-page-background bg-repeat-x md:items-center md:justify-center">
      <div className="max-w-3xl pt-16">
        <div className="mx-auto bg-zinc-800">
          <img src="/images/splash.jpg"></img>
        </div>

        <div className="mx-auto my-16 h-fit rounded-md border border-slate-800 bg-slate-400 text-slate-800">
          <div className="m-2 h-1/2 rounded-md border border-slate-800 bg-slate-200 px-2 py-2 text-center text-slate-800">
            Anonymously exchange messages with your virtual neighbors
          </div>
        </div>

        <div className="my-8 flex h-full w-full flex-row justify-evenly font-medium sm:mt-20">
          <div className="mx-auto text-slate-800">
            <Link
              to="/about"
              prefetch="intent"
              className="rounded-md border bg-slate-200 p-20 py-4 text-center shadow-md shadow-amber-200/20 hover:bg-slate-300 hover:shadow-amber-400/20"
            >
              About
            </Link>
          </div>
          <div className="mx-auto text-slate-800">
            <Link
              to="/bottle"
              prefetch="intent"
              className="rounded-md border bg-gradient-to-bl from-yellow-300 to-amber-300 p-20 py-4 text-center shadow-lg shadow-amber-300/40 hover:shadow-amber-500/60"
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
