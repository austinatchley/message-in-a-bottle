import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Note from "~/components/note";

import { getBoard, deleteBoard, getNotesInBoard } from "~/models/board.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.boardId, "boardId not found");

  const board = await getBoard({ id: params.boardId });
  if (!board) {
    throw new Response("Not Found", { status: 404 });
  }

  const notes = await getNotesInBoard({ id: params.boardId });

  const qrCodeUrl = getQrCodeUrl(params.boardId);

  return json({ board, notes, qrCodeUrl });
}

function getQrCodeUrl(id: string): string {
  const size = 100;
  const baseUrl = "https://message-in-a-bottle.fly.dev";
  const url = `${baseUrl}/boards/${id}`;

  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}`;
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.boardId, "boardId not found");

  await deleteBoard({ id: params.boardId });

  return redirect("/boards");
}

export default function BoardDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-full">
      <div className="pb-4">
        <h1 className="text-2xl text-bold font-title">{data.board.title}</h1>
      </div>

      <div className="relative box-border w-full border-2 border-stone-800 rounded-md bg-slate-200">
        <div className="w-full rounded-md bg-sky-200 px-4 py-3">
          <div className="text-center text-xl font-medium text-black">Notes</div>
        </div>

        <div className="relative grid grid-cols-3 lg:grid-cols-6 gap-4 py-4 ml-4">
          {data.notes?.notes.map(note =>
              <Note
                key={note.id}
                id={note.id}
                title={note.title}
                body={note.body}
                createdAt={note.createdAt}
              />
          )}
        </div>
      </div>

      <hr></hr>

      <div className="pl-4 py-10">
        <Link to={`/notes/new?boardId=${data.board.id}`} >
          <button
            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Create a new note in this board
          </button>
        </Link>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>board not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}