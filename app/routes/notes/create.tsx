import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
  return json({});
}

export default function CreateNotePage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="mx-auto flex h-full w-full flex-col">
      <div className="m-auto rounded border-2 border-slate-800 bg-slate-100 shadow">
        <div className="w-full bg-slate-600 py-4">
          <label className="pl-4 font-title text-white">
            <span>New Note</span>
          </label>
        </div>

        <div className="flex h-fit flex-col justify-between">
          <div className="p-20">Created successfully!</div>

          <div className="h-full w-full bg-yellow-500 py-2 text-center text-slate-100">
            <Link to="/bottle">Return to bottle</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
