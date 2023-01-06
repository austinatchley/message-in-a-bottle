import { ActionArgs, LoaderArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getBoard, deleteBoard } from "~/models/board.server";

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.boardId, "boardId not found");

  const board = await getBoard({ id: params.boardId });
  if (!board) {
    throw new Response("Not Found", { status: 404 });
  }

  const qrCodeUrl = getQrCodeUrl(params.boardId);

  return json({ board, qrCodeUrl });
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
    <div>
      <h3 className="text-2xl font-bold">Debug</h3>
      <h3 className="py-2">{"title: " + data.board.title}</h3>
      <div className="pt-8 pb-8">
        <h3 className="text-2xl font-bold">Generated QR Code</h3>
        <img className="content-center" src={`${data.qrCodeUrl}`}></img>
      </div>

      <hr></hr>

      <div className="pt-8">
        <Form method="post">
          <button
            type="submit"
            className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
          >
            Delete
          </button>
        </Form>
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