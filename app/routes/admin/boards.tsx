import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getBoards } from "../../models/board.server";
import AdminPortalToolbar from "~/shared/components/admin-portal-toolbar";

export async function loader({ request }: LoaderArgs) {
  const boardItems = await getBoards();
  return json({ boardItems: boardItems });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <AdminPortalToolbar />

      <main className="flex h-full bg-stone-100">
        <div className="h-full w-80 border-r">
          <Link to="new" className="block p-4 text-xl text-blue-600 bg-blue-200">
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
                      `block border-b p-4 text-xl hover:bg-indigo-200 hover:border-blue-300 hover:border-r-4 ${isActive ? "bg-indigo-200" : "bg-indigo-100"}`
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
