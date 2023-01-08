import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getNotes } from "~/models/note.server";

export async function loader({ request }: LoaderArgs) {
  const noteListItems = await getNotes();
  return json({ noteListItems });
}

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold font-mono">
          <Link to=".">Notes</Link>
        </h1>

        <div className="bg-stone-500 w-20">
          <h1 className="text-2xl text-stone-100 font-bold text-center font-mono underline-offset-8">
            <Link to="/">Home</Link>
          </h1>
        </div>
      </header>

      <main className="flex h-full bg-stone-100">
        <div className="h-full w-80 border-r">
          {data.noteListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <ol>
              {data.noteListItems.map((note) => (
                <li key={note.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl ${isActive ? "bg-indigo-200" : "bg-indigo-100"}`
                    }
                    to={note.id}
                  >
                    📝 {note.title}
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
    </div >
  );
}
