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

  return redirect(`/notes/created`);
}

export default function NewNotePage() {
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
    <div className="mx-auto flex h-full w-full max-w-sm flex-col">
      <div className="m-auto rounded border-2 border-theme-primary bg-theme-white shadow">
        <div className="w-full bg-slate-600 py-4">
          <label className="pl-4 font-title text-white">
            <span>New Note</span>
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
          className="rounded px-8 pb-8 pt-6 shadow-md"
        >
          <div>
            <label className="mb-2 flex w-full flex-col gap-1">
              <span className="text-md block font-bold text-gray-700">
                Title
              </span>
              <input
                ref={titleRef}
                name="title"
                className="flex-1 rounded border border-slate-400 px-3 text-lg leading-loose shadow"
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
              <span className="text-md block font-bold text-gray-700">
                Message
              </span>
              <textarea
                ref={bodyRef}
                name="body"
                rows={8}
                className="w-full flex-1 rounded border border-slate-400 px-3 py-2 text-lg leading-6 shadow"
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

          <div className="mt-6 text-right">
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
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
