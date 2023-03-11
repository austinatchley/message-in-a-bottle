import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <div className="w-full h-full">
      <div className="flex mx-auto max-w-sm border border-slate-500 bg-blue-200 shadow-md hover:shadow-lg">
        <Link to="/bottles/new" className="w-full h-full">
          <div className="w-full h-full">
            <p className="text-center pt-12 font-accent text-4xl">
              Create a new bottle
            </p>
            <div className="w-full pt-2">
              <img src="/images/the_bottle_1.png" className="mx-auto w-full"></img>
            </div>
          </div>
        </Link>
      </div>

      <div className="pt-8 text-center">
        <p>
          To find an existing bottle, scan its QR code and save the link. All bottles are private by convention. If you lose the link, the bottle is gone forever!
        </p>
      </div>
    </div>
  );
}
