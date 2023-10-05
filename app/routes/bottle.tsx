import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { MenuToolbar } from "~/components/menu-toolbar";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function BottlePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header>
        <MenuToolbar />
      </header>

      <div className="relative flex flex-grow">
        <main className="flex-1 bg-theme-white p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
