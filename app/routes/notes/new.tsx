import { ActionArgs, LoaderArgs, json, redirect } from "@remix-run/node";
import { Form, useActionData, useCatch, useLoaderData } from "@remix-run/react";
import * as React from "react";

import { createNote } from "~/models/note.server";

export async function loader({ request, params }: LoaderArgs) {
  return json({});
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", body: null } },
      { status: 400 }
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null } },
      { status: 400 }
    );
  }

  await createNote({ title, body });

  return redirect(`/notes/create`);
}

export default function NewNotePage() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col w-full h-full max-w-sm mx-auto">
      <div className="m-auto bg-slate-100 rounded shadow border-slate-800 border-2">
        <div className="py-4 bg-slate-600 w-full">
          <label className="text-white pl-4 font-title">
            <span>
              New Note
            </span>
          </label>
        </div>
        <Form
          method="post"
          reloadDocument
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: "100%",
          }}
          className="shadow-md rounded px-8 pt-6 pb-8"
        >

          <div>
            <label className="flex w-full flex-col gap-1 mb-2">
              <span className="block text-gray-700 text-md font-bold">Title</span>
              <input
                ref={titleRef}
                name="title"
                className="flex-1 shadow rounded border border-slate-400 px-3 text-lg leading-loose"
                aria-invalid={actionData?.errors?.title ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.title ? "title-error" : undefined
                }
              />
            </label>
            {actionData?.errors?.title && (
              <div className="pt-1 text-red-700" id="title-error">
                {actionData.errors.title}
              </div>
            )}
          </div>

          <div>
            <label className="flex w-full flex-col gap-1">
              <span className="block text-gray-700 text-md font-bold">Message</span>
              <textarea
                ref={bodyRef}
                name="body"
                rows={8}
                className="w-full flex-1 shadow rounded border border-slate-400 py-2 px-3 text-lg leading-6"
                aria-invalid={actionData?.errors?.body ? true : undefined}
                aria-errormessage={
                  actionData?.errors?.body ? "body-error" : undefined
                }
              />
            </label>
            {actionData?.errors?.body && (
              <div className="pt-1 text-red-700" id="body-error">
                {actionData.errors.body}
              </div>
            )}
          </div>

          <div className="text-right mt-6">
            <button
              type="submit"
              className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
            >
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred.</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Page not found</div>;
  }

  console.log(caught);

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}