import type { LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import MenuToolbar from "~/components/menu-toolbar";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function NotesPage() {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <MenuToolbar />

      <main>
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div >
  );
}
