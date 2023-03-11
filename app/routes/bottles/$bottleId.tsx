import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import BottleBoardView from "../../components/bottle-board-view";

import { getBottle, deleteBottle, getNotesInBottle } from "~/models/bottle.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.bottleId, "bottleId not found");

  const bottle = await getBottle({ id: params.bottleId });
  if (!bottle) {
    throw new Response("Not Found", { status: 404 });
  }

  const notes = await getNotesInBottle({ id: params.bottleId });

  return json({ bottle, notes });
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.bottleId, "bottleId not found");

  await deleteBottle({ id: params.bottleId });

  return redirect("/bottles");
}

export default function BottleDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="min-h-full">
      <BottleBoardView
        bottle={data.bottle}
        notes={data.notes.notes}
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