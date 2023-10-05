import { Outlet } from "@remix-run/react";
import { MenuToolbar } from "~/components/menu-toolbar";

export default function Notes() {
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
