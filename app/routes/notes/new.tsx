import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createNote } from "~/models/note.server";

export async function action({ request }: ActionArgs) {
  console.log(request.body);
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const xpos = formData.get("xpos");
  const ypos = formData.get("ypos");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", body: null, xpos: 0, ypos: 0 } },
      { status: 400 }
    );
  }

  if (typeof body !== "string" || body.length === 0) {
    return json(
      { errors: { body: "Body is required", title: null, xpos: 0, ypos: 0 } },
      { status: 400 }
    );
  }

  console.log(xpos);
  console.log(ypos);

  if (typeof xpos !== "string" || xpos.length === 0) {
    return json(
      { errors: { body: "xpos is required", title: null, xpos: 0, ypos: 0 } },
      { status: 400 }
    );
  }

  if (typeof ypos !== "string" || ypos.length === 0) {
    return json(
      { errors: { body: "ypos is required", title: null, xpos: 0, ypos: 0 } },
      { status: 400 }
    );
  }

  const note = await createNote({ title, body, xpos: Number(xpos), ypos: Number(ypos) });

  return redirect(`/notes/${note.id}`);
}

export default function NewNotePage() {
  const actionData = useActionData<typeof action>();
  const titleRef = React.useRef<HTMLInputElement>(null);
  const bodyRef = React.useRef<HTMLTextAreaElement>(null);
  const xposRef = React.useRef<HTMLTextAreaElement>(null);
  const yposRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.body) {
      bodyRef.current?.focus();
    } else if (actionData?.errors?.xpos) {
      xposRef.current?.focus();
    } else if (actionData?.errors?.ypos) {
      yposRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Form
      method="post"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 8,
        width: "100%",
      }}
    >
      <div>
        <label className="flex w-full flex-col gap-1">
          <span>Title: </span>
          <input
            ref={titleRef}
            name="title"
            className="flex-1 rounded-md border-2 border-blue-500 px-3 text-lg leading-loose"
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
          <span>Body: </span>
          <textarea
            ref={bodyRef}
            name="body"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
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

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>xpos: </span>
          <textarea
            ref={xposRef}
            name="xpos"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            aria-invalid={actionData?.errors?.xpos ? true : undefined}
            aria-errormessage={
              actionData?.errors?.xpos ? "xpos-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.xpos && (
          <div className="pt-1 text-red-700" id="xpos-error">
            {actionData.errors.xpos}
          </div>
        )}
      </div>

      <div>
        <label className="flex w-full flex-col gap-1">
          <span>ypos: </span>
          <textarea
            ref={yposRef}
            name="ypos"
            rows={8}
            className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
            aria-invalid={actionData?.errors?.ypos ? true : undefined}
            aria-errormessage={
              actionData?.errors?.ypos ? "ypos-error" : undefined
            }
          />
        </label>
        {actionData?.errors?.ypos && (
          <div className="pt-1 text-red-700" id="ypos-error">
            {actionData.errors.ypos}
          </div>
        )}
      </div>

      <div className="text-right">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Save
        </button>
      </div>
    </Form>
  );
}
