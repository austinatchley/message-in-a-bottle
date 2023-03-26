import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <div className="w-full h-full">
      <div className="flex flex-row gap-20 h-full w-fit mx-auto">
        <div className="my-auto max-w-sm h-fit border border-slate-500 bg-blue-200 shadow-md hover:shadow-lg">
          <Link to="/notes/new" className="w-full h-full">
            <div className="w-full h-full">
              <p className="text-center pt-12 font-accent text-4xl">
                Put a message in the bottle
              </p>
              <div className="w-full pt-2">
                <img src="/images/the_bottle_1.png" className="mx-auto w-full"></img>
              </div>
            </div>
          </Link>
        </div>
        
        <div className="invert my-auto max-w-sm h-fit border border-slate-500 bg-blue-200 shadow-md hover:shadow-lg">
          <Link to="/notes/take" className="w-full h-full">
            <div className="w-full h-full">
              <p className="text-center pt-12 font-accent text-4xl">
                Take a message from the bottle
              </p>
              <div className="w-full pt-2">
                <img src="/images/the_bottle_1.png" className="mx-auto w-full"></img>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
