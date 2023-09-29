import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import React from "react";
import { getAdminPassword } from "~/utils";

export async function action({ request, params }: ActionArgs) {
  const formData = await request.formData();

  const password = formData.get("password");
  console.log(password);
  console.log(getAdminPassword());

  if (typeof password !== "string" || password !== getAdminPassword()) {
    return json(
      { errors: { password: "Password is invalid" } },
      { status: 400 }
    );
  }

  return redirect("/admin/notes");
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <main className="relative min-h-screen bg-slate-800 sm:flex sm:items-center sm:justify-center">
      <div className="relative bg-slate-500 sm:w-full sm:rounded-2xl sm:pb-8 sm:pt-8 md:w-1/2 lg:w-1/3">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative sm:overflow-hidden sm:rounded-2xl">
            <div className="relative bg-yellow-500 px-4 pb-8 pt-16 sm:px-6 sm:pb-14 sm:pt-24 lg:px-8 lg:pb-20 lg:pt-32">
              <h1 className="font-body text-center text-2xl tracking-tight sm:text-2xl lg:text-3xl">
                <div className="block pb-8 font-title font-bold text-slate-700">
                  Admin Portal
                </div>
              </h1>
              <Form
                method="post"
                reloadDocument
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                  width: "100%",
                }}
                className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center"
              >
                <div>
                  <label className="mb-2 flex w-full flex-col gap-1">
                    <span className="text-md block font-bold text-gray-700">
                      Password
                    </span>
                    <input
                      ref={passwordRef}
                      name="password"
                      className="flex-1 rounded border border-slate-400 px-3 text-lg leading-loose shadow"
                      aria-invalid={
                        actionData?.errors?.password ? true : undefined
                      }
                      aria-errormessage={
                        actionData?.errors?.password
                          ? "password-error"
                          : undefined
                      }
                    />
                  </label>
                  {actionData?.errors?.password && (
                    <div className="pt-1 text-red-700" id="password-error">
                      {actionData.errors.password}
                    </div>
                  )}
                </div>
                <div className="mt-6 text-right">
                  <button
                    type="submit"
                    className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:bg-blue-400"
                  >
                    Enter
                  </button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
