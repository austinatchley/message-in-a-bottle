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
        <h1 className="text-3xl font-bold font-mono">
          <Link to=".">message_in_a_bottle_</Link>
        </h1>

        <div className="bg-stone-500 hover:bg-sky-800 w-20">
          <h1 className="text-2xl text-stone-100 font-bold text-center font-mono">
            <button onClick={handleMenuButtonClick}>Menu</button>
            {menuOpen ? (
              <ul className="menu absolute right-4 w-60 z-50 bg-slate-300 text-slate-800 font-thin text-lg divide-y divide-slate-900">
                <li className="menu-item object-fill">
                  <Link to="/">
                    <button>Home</button>
                  </Link>
                </li>
                <li className="menu-item">
                  <Link to="/admin/boards">
                    <button>Admin Portal</button>
                  </Link>
                </li>
              </ul>
            ) : null}
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
