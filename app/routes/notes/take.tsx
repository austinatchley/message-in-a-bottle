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
    <div className="flex flex-col w-full h-full mx-auto">
      <div className="m-auto">
        <div className="flex flex-col w-full justify-between h-fit">
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
            <h1 className="font-bold pb-2 text-center">
              Are you sure you want to take a note?
            </h1>

            <button type="submit" className="p-8 bg-yellow-500 rounded-md shadow-lg">
              <div className="text-center text-slate-900">
                Yes
              </div>
            </button>


            <button type="button" className="mx-auto w-3/4 h-full py-2 bg-amber-500 rounded-md text-slate-900">
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
