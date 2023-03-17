import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { BottleView } from "../../components/bottle-view";

import { getBottle, deleteBottle, getNotesInBottle, GetBottleReturnType } from "~/models/bottle.server";
import { Note } from "@prisma/client";
import NoteDetailsPage from "../admin/notes/$noteId";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.bottleId, "bottleId not found");

  const bottle: GetBottleReturnType = await getBottle({ id: params.bottleId });
  if (!bottle) {
    throw new Response("Not Found", { status: 404 });
  }

  const note: Note | undefined = getNote(bottle.notes);

  return json({ bottle, note });
}

function getNote(notes: Note[]): Note | undefined {
  if (notes.length <= 0) {
    return undefined;
  }

  // TODO: Implement a note selection strategy
  return notes[0];
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.bottleId, "bottleId not found");

  await deleteBottle({ id: params.bottleId });

  return redirect("/bottles");
}

export default function BottleDetailsPage() {
  const data = useLoaderData<typeof loader>();

  const serializedNote = data.note;
  if (!serializedNote || !serializedNote.id) {
    throw new Error("Note not found");
  }
  const note: Note = {
    ...serializedNote,
    createdAt: new Date(serializedNote.createdAt)
  };

  return (
    <div className="min-h-full">
      <BottleView
        bottle={data.bottle}
        note={note}
      />
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
    return <div>Bottle not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}