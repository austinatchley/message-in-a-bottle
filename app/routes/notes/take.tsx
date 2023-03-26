import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";

import { getFirstNote } from "~/models/note.server";

export async function action({ request }: ActionArgs) {
  const note = await getFirstNote();

  if (!note) {
    return json({ errors: { note: null }, status: 500 });
  }

  return redirect(`/notes/${note.id}`);
}

export default function TakeNotePage() {
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
              className="rounded-md bg-yellow-500 p-8 shadow-lg"
            >
              <div className="text-center text-slate-900">Yes</div>
            </button>

            <button
              type="button"
              className="mx-auto h-full w-3/4 rounded-md bg-amber-500 py-2 text-slate-900"
            >
              <Link to="/bottle" className="mx-2 text-center">
                No, return to staring into the bottle void
              </Link>
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
