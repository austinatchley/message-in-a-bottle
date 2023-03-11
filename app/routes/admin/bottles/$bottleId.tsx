import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
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

  const qrCodeUrl = getQrCodeUrl(params.bottleId);

  return json({ bottle, notes, qrCodeUrl });
}

function getQrCodeUrl(id: string): string {
  const size = 100;
  const baseUrl = "https://message-in-a-bottle.fly.dev";
  const url = `${baseUrl}/bottles/${id}`;

  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}`;
}

export async function action({ request, params }: ActionArgs) {
  invariant(params.bottleId, "bottleId not found");

  await deleteBottle({ id: params.bottleId });

  return redirect("/admin/bottles");
}

export default function BottleDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <div className="pb-4">
        <div className="text-2xl">{data.bottle.title}</div>
      </div>

      <div className="border-2 border-stone-800 rounded-md bg-slate-200">
        <div className="items-center justify-center rounded-md bg-sky-200 px-4 py-3 text-base font-medium text-black">
          <div className="text-xl grid place-items-center">Notes</div>
        </div>

        <div className="grid grid-cols-3 gap-8 py-4 ml-4">
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

      <h3 className="text-2xl py-4 font-bold">Debug</h3>
      <div className="pt-8 pb-8 grid justify-start">
        <h3 className="text-xl font-bold">Generated QR Code</h3>
        <QrCode
          relativePath={`bottles/${data.qrCodeUrl}`}
        />
      </div>

      <hr></hr>

      <h3 className="text-xl py-4 font-bold">Admin Functionality</h3>

      <div className="flex flex-row">
        <div className="p-4">
          <Link to={`/notes/new?bottleId=${data.bottle.id}`} >
            <button
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Create a new note in this bottle 
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
          <Link to={`/bottles/${data.bottle.id}`} >
            <button
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              View this bottle's page
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
    return <div>Bottle not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}