import { LoaderArgs } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import invariant from "tiny-invariant";
import { NoteView } from "../../components/note-view";

import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { takeNote } from "~/models/note.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.noteId, "noteId not found");

  const note = await takeNote({ id: params.noteId });
  if (!note) {
    throw new Response("Not Found", { status: 404 });
  }

  return typedjson({ note });
}

export default function NoteDetailsPage() {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <div className="sm:pt-28">
      <NoteView note={data.note} />
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
