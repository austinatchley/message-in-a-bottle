import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function NotesPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold font-title">
          Create a Note
        </h1>


        <div className="bg-slate-500 hover:bg-sky-800 w-20">
          <h1 className="text-2xl px-2 text-stone-100 font-medium text-center">
            <Link to="/">Menu</Link>
          </h1>
        </div>
      </header>

      <main>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div >
  );
}
