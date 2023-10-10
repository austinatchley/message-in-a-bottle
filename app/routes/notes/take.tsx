import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import React from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";

import { selectNote } from "~/models/note.server";

export async function loader({ request, context, params }: LoaderArgs) {
  // TODO: Implement rate limiter
  // TODO: Extract the client IP from Fly's `fly-client-ip` header https://fly.io/docs/reference/runtime-environment/#fly-client-ip

  return typedjson({});
}

export async function action({ request }: ActionArgs) {
  console.log(request);
  const note = await selectNote();

  if (!note) {
    return json({
      errors: { note: "No notes left. Please add one", redirect: "/notes/new" },
      status: 500,
    });
  }

  return redirect(`/notes/${note.id}`);
}

export default function TakeNotePage() {
  const data = useTypedLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div className="m-auto">
        <h1 className="pb-8 text-center text-4xl font-bold">
          Are you sure you want to take a note?
        </h1>
        <h2 className="animate-pulse pb-16 text-center text-2xl font-light">
          It will disappear after you have taken it
        </h2>
        <div className="mx-auto flex h-fit w-fit flex-col justify-between">
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
            {actionData?.errors.note == null ? (
              <button
                type="submit"
                className="border border-theme-primary bg-theme-secondary p-8 shadow-lg hover:animate-pulse hover:invert"
              >
                <div className="text-center text-slate-900">
                  "Yes, take a note"
                </div>
              </button>
            ) : (
              <Link to={actionData.errors.redirect}>
                <button
                  type="button"
                  className="border border-theme-primary bg-theme-error p-8 shadow-lg hover:animate-pulse"
                >
                  <div className="text-center text-slate-900">
                    {actionData?.errors.note}
                  </div>
                </button>
              </Link>
            )}

            {actionData?.errors.note == null ? (
              <Link to="/bottle" className="mx-2 text-center">
                <button
                  type="button"
                  className="mx-auto h-full w-full border border-theme-primary bg-amber-500 py-2 text-slate-900 hover:animate-pulse hover:invert"
                >
                  No
                </button>
              </Link>
            ) : (
              <div></div>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
