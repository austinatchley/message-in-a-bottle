import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getBoards } from "../models/board.server";

export async function loader({ request }: LoaderArgs) {
  const boardItems = await getBoards();
  return json({ boardItems: boardItems });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Boards</Link>
        </h1>

        <div className="bg-emerald-500 w-20">
          
          <h1 className="text-2xl text-right font-mono underline-offset-8">
            <Link to="/">Home</Link>
          </h1>
        </div>
      </header>

      <main className="flex h-full bg-white">
        <div className="h-full w-80 border-r bg-gray-50">
          <Link to="new" className="block p-4 text-xl text-blue-500">
            + New Board
          </Link>

          <hr />

          {data.boardItems.length === 0 ? (
            <p className="p-4">No boards yet</p>
          ) : (
            <ol>
              {data.boardItems.map((board) => (
                <li key={board.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`
                    }
                    to={board.id}
                  >
                    📝 {board.title}
                  </NavLink>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
