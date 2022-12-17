import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getNotesFullRepresentation } from "~/models/note.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.boardId, "boardId not found");

  const noteListItems = await getNotesFullRepresentation();
  const qrCodeUrl = getQrCodeUrl(params.boardId);

  return json({ noteListItems, qrCodeUrl });
}

function getQrCodeUrl(id: string): string {
  const size = 100;
  const baseUrl = "https://message-in-a-bottle.fly.dev";
  const noteUrl = `${baseUrl}/notes/${id}`;

  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${noteUrl}`;
}

export default function BoardPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
        <h1 className="text-3xl font-bold">
          <Link to=".">Notes</Link>
        </h1>
        <img src={`${data.qrCodeUrl}`}></img>
      </header>

      <main className="flex mx-auto h-full bg-white">
        <div className="bg-gray-20">
          {data.noteListItems.length === 0 ? (
            <p className="p-4">No notes yet</p>
          ) : (
            <div className="grid grid-cols-4 gap-10">{
              data.noteListItems.map((note) => (
                <div key={note.id} className="flex relative">
                  <div className={`relative bottom-${note.ypos} left-${note.xpos} box-border h-64 w-64 p-4 border-4 bg-yellow-100 shadow-lg shadow-black-500/50`}>
                    <p className="py-2">{note.title}</p>
                    <br></br>
                    <p className="py-2">{note.body}</p>
                  </div>
                </div>
              ))
            }</div>
          )}
        </div>
      </main>
    </div>
  );
}
