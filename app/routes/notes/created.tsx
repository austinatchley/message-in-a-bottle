import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
  return json({});
}

export default function CreateNotePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="m-auto flex h-full w-fit flex-col justify-center">
      <div className="rounded border-2 border-theme-primary bg-theme-accent-1 shadow">
        <div className="w-full bg-theme-accent-2 py-4">
          <label className="pl-4 font-title text-theme-white">
            <span>New Note</span>
          </label>
        </div>

        <div className="h-fit bg-theme-white">
          <div className="p-20">Created successfully!</div>
        </div>
      </div>
      <Link
        to="/bottle"
        className="my-4 w-full bg-theme-secondary px-4 py-2 text-center text-theme-accent-2"
      >
        Return to bottle
      </Link>
    </div>
  );
}