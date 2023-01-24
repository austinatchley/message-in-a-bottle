import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { getBoards } from "../models/board.server";
import Toolbar from "~/shared/components/toolbar";

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
      <Toolbar />

      <main className="flex h-full bg-stone-100">
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
