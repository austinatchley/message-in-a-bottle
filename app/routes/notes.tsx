import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { MenuToolbar } from "~/components/menu-toolbar";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function Notes() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header>
        <MenuToolbar />
      </header>

      <main className="flex h-full bg-theme-white">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
