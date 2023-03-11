import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Note from "~/components/note";
import QrCode from "~/components/qr-code";

import { getBottle, deleteBottle, getNotesInBottle } from "~/models/bottle.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.bottleId, "bottleId not found");

  const bottle = await getBottle({ id: params.bottleId });
  if (!bottle) {
    throw new Response("Not Found", { status: 404 });
  }

  const notes = await getNotesInBottle({ id: params.bottleId });

  return json({ bottle: bottle, notes });
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
      <div className="mx-auto max-w-sm sm:max-w-xl lg:max-w-4xl w-full px-8 sm:px-0">
        <div className="pb-4">
          <h1 className="text-2xl text-bold font-title text-left">{data.bottle.title}</h1>
        </div>

        <div className="relative box-border w-full border-2 border-stone-800 rounded-md bg-slate-200">
          <div className="w-full rounded-md bg-sky-200 px-4 py-3">
            <div className="text-left text-xl font-medium text-black">Notes</div>
          </div>

          <div className="relative grid grid-cols-3 lg:grid-cols-4 gap-4 py-4 ml-4">
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

        <div className="pt-20"></div>
        <hr></hr>

        <div className="px-4 py-10 flex justify-around h-full w-full">
          <div className="w-200 h-64 py-4">
            <Link to={`/notes/new?bottleId=${data.bottle.id}`} >
              <button
                className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
              >
                Create a new note in this bottle
              </button>
            </Link>
          </div>

          <div className="w-64 h-64">
            <h3 className="text-xl font-bold text-center">Generated QR Code</h3>
            <QrCode
              relativePath={`bottles/${data.bottle.id}`}
              width={100}
              height={100}
            />
          </div>
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
    return <div>Bottle not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}