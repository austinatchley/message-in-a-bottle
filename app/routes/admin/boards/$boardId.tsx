import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

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

  return redirect("/admin/boards");
}

export default function BoardDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="pb-4">
        <div className="text-2xl">{data.board.title}</div>
      </div>

      <div className="border-2 border-stone-800 rounded-md bg-slate-200">
        <div className="items-center justify-center rounded-md bg-sky-200 px-4 py-3 text-base font-medium text-black">
          <div className="text-xl grid place-items-center">Notes</div>
        </div>

        <div className="grid grid-cols-3 gap-8 py-4 ml-4">
          {data.notes?.notes.map(note =>
            <div
              key={note.id}
              className="box-border relative h-64 w-64 p-4 border-4 bg-yellow-100 shadow-lg shadow-black-500/50">
              <p className="py-2 font-semibold">{note.title}</p>
              <p className="py-2 font-thin">{note.body}</p>
              <br></br>
              <div className="absolute inset-x-0 bottom-4 left-1 grid place-items-center">
                <p className="text-xs font-extralight">{note.createdAt}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <hr></hr>

      <h3 className="text-2xl py-4 font-bold">Debug</h3>
      <div className="pt-8 pb-8 grid justify-start">
        <h3 className="text-xl font-bold">Generated QR Code</h3>
        <img className="justify-self-center py-4" src={data.qrCodeUrl}></img>
      </div>

      <hr></hr>

      <h3 className="text-xl py-4 font-bold">Admin Functionality</h3>

      <div className="flex flex-row">
        <div className="p-4">
          <Link to={`/notes/new?boardId=${data.board.id}`} >
            <button
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Create a new note in this board
            </button>
          </Link>
        </div>

        <div className="p-4">
          <Form method="post">
            <button
              type="submit"
              className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Delete
            </button>
          </Form>
        </div>

        <div className="p-4">
          <Link to={`/boards/${data.board.id}`} >
            <button
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              View this board's page
            </button>
          </Link>
        </div>
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