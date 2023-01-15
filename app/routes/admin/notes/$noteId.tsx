import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteNote, getNote } from "~/models/note.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.noteId, "noteId not found");

  const note = await getNote({ id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ note });
}


export async function action({ request, params }: ActionArgs) {
  invariant(params.noteId, "noteId not found");

  await deleteNote({ id: params.noteId });

  return redirect("/notes");
}

export default function NoteDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="flex relative">
        <div className={`relative bottom-${data.note.ypos} left-${data.note.xpos} box-border h-64 w-64 p-4 border-4 bg-yellow-100 shadow-lg shadow-black-500/50`}>
          <p className="py-2">{data.note.title}</p>
          <p className="py-2">{data.note.boardId}</p>
          <br></br>
          <p className="py-2">{data.note.body}</p>
        </div>
      </div>
      <br></br>
      <h3 className="text-2xl font-bold">Debug</h3>
      <h3 className="py-2">{"title: " + data.note.title}</h3>
      <p className="py-2">{"body: " + data.note.body}</p>
      <p className="py-2">{"xpos: " + data.note.xpos}</p>
      <p className="py-2">{"ypos: " + data.note.ypos}</p>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
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
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
