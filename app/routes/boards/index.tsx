import { Link } from "@remix-run/react";

export default function BoardIndexPage() {
  return (
    <div className="w-full">
      <div className="w-full flex justify-center py-40 border border-slate-900">
        <Link to="/boards/new">
          Create a new board  -- Add an image here --
        </Link>
      </div>
      <div className="w-full flex justify-center py-10">
        -- OR --
      </div>
      <div className="">
        <p>
          To find an existing board, scan its QR code and save the link. All boards are private by convention
        </p>
      </div>
    </div>
  );
}
