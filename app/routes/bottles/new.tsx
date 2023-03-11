import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createBottle } from "~/models/bottle.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", body: null, xpos: 0, ypos: 0 } },
      { status: 400 }
    );
  }

  const bottle = await createBottle({ title });

  return redirect(`/bottles/${bottle.id}`);
}

export default function NewBottlePage() {
  const actionData = useActionData<typeof action>();
  const titleRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col w-full h-full max-w-sm mx-auto">
      <div className="m-auto bg-slate-100 rounded shadow border-slate-800 border-2">
        <div className="py-4 bg-slate-600 w-full">
          <label className="text-white pl-4 font-title">
            <span>
              New Bottle
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
