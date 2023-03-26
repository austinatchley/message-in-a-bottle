import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex h-full w-fit flex-row gap-20">
        <div className="my-auto h-fit max-w-sm border border-slate-500 bg-blue-200 shadow-md hover:shadow-lg">
          <Link to="/notes/new" className="h-full w-full">
            <div className="h-full w-full">
              <p className="pt-12 text-center font-accent text-4xl">
                Put a message in the bottle
              </p>
              <div className="w-full pt-2">
                <img
                  src="/images/the_bottle_1.png"
                  className="mx-auto w-full"
                ></img>
              </div>
            </div>
          </Link>
        </div>

        <div className="my-auto h-fit max-w-sm border border-slate-500 bg-blue-200 shadow-md invert hover:shadow-lg">
          <Link to="/notes/take" className="h-full w-full">
            <div className="h-full w-full">
              <p className="pt-12 text-center font-accent text-4xl">
                Take a message from the bottle
              </p>
              <div className="w-full pt-2">
                <img
                  src="/images/the_bottle_1.png"
                  className="mx-auto w-full"
                ></img>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
