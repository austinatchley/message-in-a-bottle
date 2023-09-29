import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";

import { getAllNotes } from "~/models/note.server";

import { MenuToolbar } from "~/components/menu-toolbar";

export async function loader({ request }: LoaderArgs) {
  const noteListItems = await getAllNotes();
  return json({ noteListItems });
}

export default function NotesPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <MenuToolbar />

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
                      `block border-b p-4 text-xl ${
                        isActive ? "bg-indigo-200" : "bg-indigo-100"
                      }`
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
    </div>
  );
}
