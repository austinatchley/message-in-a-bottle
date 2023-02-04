import { Link } from "@remix-run/react";

export default function BoardIndexPage() {
  return (
    <div className="w-full h-full">
      <div className="w-1/4 max-w-md flex mx-auto border border-slate-500 bg-blue-200 shadow-md hover:shadow-lg">
        <Link to="/boards/new" className="w-full h-full">
          <div className="w-full h-full">
            <p className="text-center pt-20 font-accent text-4xl">
              Create a new bottle
            </p>
            <img src="the_bottle_1.png" className="mx-auto object-contain w-full"></img>
          </div>
        </Link>
      </div>

      <div className="pt-16">
        <p>
          To find an existing board, scan its QR code and save the link. All boards are private by convention
        </p>
      </div>
    </div>
  );
}
