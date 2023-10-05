import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

import { selectNote } from "~/models/note.server";

export async function loader({ request, context, params }: LoaderArgs) {
  // TODO: Implement rate limiter
  // TODO: Extract the client IP from Fly's `fly-client-ip` header https://fly.io/docs/reference/runtime-environment/#fly-client-ip

  return typedjson({});
}

export async function action({ request }: ActionArgs) {
  const note = await selectNote();

  if (!note) {
    return json({ errors: { note: null }, status: 500 });
  }

  return redirect(`/notes/${note.id}`);
}

export default function TakeNotePage() {
  const data = useTypedLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div className="m-auto">
        <div className="flex h-fit w-full flex-col justify-between">
          <Form
            method="post"
            reloadDocument
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: "100%",
            }}
          >
            <h1 className="pb-2 text-center font-bold">
              Are you sure you want to take a note?
            </h1>

            <button
              type="submit"
              className="rounded-md bg-theme-secondary p-8 shadow-lg"
            >
              <div className="text-center text-slate-900">Yes, take a note</div>
            </button>

            <Link to="/bottle" className="mx-2 text-center">
              <button
                type="button"
                className="mx-auto h-full w-3/4 rounded-md bg-amber-500 py-2 text-slate-900"
              >
                No
              </button>
            </Link>
          </Form>
        </div>
      </div>
    </div>
  );
}
