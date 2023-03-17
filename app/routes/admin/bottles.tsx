import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { getBottles } from "../../models/bottle.server";
import { AdminPortalToolbar } from "~/components/admin-portal-toolbar";

export async function loader({ request }: LoaderArgs) {
  const bottles = await getBottles();
  return json({ bottles: bottles });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header>
        <AdminPortalToolbar />
      </header>

      <main className="flex h-full bg-stone-100">
        <div className="h-full w-80 border-r">
          <Link to="new" className="block p-4 text-xl text-blue-600 bg-blue-200">
            + New Bottle
          </Link>

          <hr />

          {data.bottles.length === 0 ? (
            <p className="p-4">No bottles yet</p>
          ) : (
            <ol>
              {data.bottles.map((bottle) => (
                <li key={bottle.id}>
                  <NavLink
                    className={({ isActive }) =>
                      `block border-b p-4 text-xl hover:bg-indigo-200 hover:border-blue-300 hover:border-r-4 ${isActive ? "bg-indigo-200" : "bg-indigo-100"}`
                    }
                    to={bottle.id}
                  >
                    📝 {bottle.title}
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
