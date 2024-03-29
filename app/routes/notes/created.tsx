import { Link } from "@remix-run/react";

export default function CreateNotePage() {
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
        prefetch="intent"
        className="my-4 w-full rounded-md border border-theme-accent-2 bg-theme-accent-1 px-4 py-2 text-center text-theme-accent-2 hover:bg-theme-secondary"
      >
        Return to bottle
      </Link>
    </div>
  );
}
