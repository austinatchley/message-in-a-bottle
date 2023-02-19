import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";

import { createBoard } from "~/models/board.server";

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", body: null, xpos: 0, ypos: 0 } },
      { status: 400 }
    );
  }

  const board = await createBoard({ title });

  return redirect(`/boards/${board.id}`);
}

export default function NewBoardPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex flex-col w-full mt-20 max-w-sm mx-auto">
      <div className="py-4 bg-blue-600 w-full rounded">
        <label className="text-white pl-4 font-title">
          <span className="">
            New Board
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
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
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
  );
}
