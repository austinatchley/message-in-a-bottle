import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => ({
  title: "Message in a Bottle",
  description: "Anonymous chat app",
});

export default function Index() {
  return (
    <main className="flex min-h-screen flex-col justify-evenly bg-theme-primary md:items-center md:justify-center">
      <div className="max-w-3xl pt-8">
        <div className="mx-auto border-4 border-amber-400 bg-zinc-800">
          <img src="/images/splash.jpg" alt=""></img>
        </div>

        <div className="mx-auto my-8 h-fit rounded-md border border-theme-primary bg-amber-400 text-theme-primary">
          <div className="m-2 h-1/2 rounded-md border border-theme-primary bg-theme-note p-2 text-center text-theme-primary">
            Anonymously exchange messages with your virtual neighbors
          </div>
        </div>

        <div className="my-4 flex h-full w-full flex-row justify-evenly font-medium sm:mt-14">
          <div className="mx-auto text-theme-primary">
            <Link
              to="/about"
              prefetch="intent"
              className="rounded-md border bg-slate-200 p-20 py-4 text-center shadow-md shadow-amber-200/20 hover:bg-slate-300 hover:shadow-amber-400/20"
            >
              About
            </Link>
          </div>
          <div className="mx-auto text-theme-primary">
            <Link
              to="/bottle"
              prefetch="intent"
              className="rounded-md border bg-gradient-to-bl from-yellow-300 to-amber-300 p-20 py-4 text-center shadow-md shadow-amber-300/40 hover:shadow-amber-500/60"
            >
              Enter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
