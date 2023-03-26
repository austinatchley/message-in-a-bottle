import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { useCatch } from "@remix-run/react";
import invariant from "tiny-invariant";
import { BottleView } from "../../components/bottle-view";

import { getBottle, deleteBottle, GetBottleReturnType } from "~/models/bottle.server";
import { Note } from "@prisma/client";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.bottleId, "bottleId not found");

  const bottle: GetBottleReturnType = await getBottle({ id: params.bottleId });
  if (!bottle) {
    throw new Response("Not Found", { status: 404 });
  }

  // TODO: Explore note filtering on the DB side through narrowing the query. Currently we are 
  // fetching all notes and filtering them on the server
  const note: Note | undefined = selectNote(bottle.notes);

  return typedjson({ bottle, note });
}

// Given a bottle's contents, select a single note to show the user
function selectNote(notes: Note[]): Note | undefined {
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
  const data = useTypedLoaderData<typeof loader>();

  return (
    <div className="min-h-full">
      <BottleView
        bottle={data.bottle}
        note={data.note}
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