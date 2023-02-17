import { Link } from "@remix-run/react";

export default function BoardIndexPage() {
  return (
    <div className="w-full h-full">
      <div className="flex mx-auto sm:w-1/2 lg:w-1/4 max-w-md h-1/2 border border-slate-500 bg-blue-200 shadow-md hover:shadow-lg">
        <Link to="/boards/new" className="w-full h-full">
          <div className="w-full h-full overflow-hidden">
            <p className="text-center pt-12 font-accent text-4xl">
              Create a new bottle
            </p>
            <div className="mx-auto h-32 w-32 pt-8 object-scale-down">
              <img src="/images/the_bottle_1.png" className="mx-auto"></img>
            </div>
          </div>
        </Link>
      </div>

      <div className="pt-16 text-center">
        <p>
          To find an existing board, scan its QR code and save the link. All boards are private by convention. If you lose the link, the board is gone forever!
        </p>
      </div>
    </div>
  );
}
