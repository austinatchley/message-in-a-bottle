import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { getBoards } from "../models/board.server";

export async function loader({ request }: LoaderArgs) {
  const boardItems = await getBoards();
  return json({ boardItems: boardItems });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [menuOpen, setMenuOpen] = React.useState(false);

  function handleMenuButtonClick() {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold font-title">
          <Link to=".">message_in_a_bottle_</Link>
        </h1>

        <div className="bg-slate-500 hover:bg-sky-800 w-20">
          <h1 className="text-2xl px-2 text-stone-100 font-medium text-center">
            <Link to="/">Menu</Link>
          </h1>
        </div>
      </header>

      <main className="flex h-full bg-stone-100">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
