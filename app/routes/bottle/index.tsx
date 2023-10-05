import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <div className="h-full w-full">
      <div className="m-auto flex h-fit w-fit flex-row gap-20">
        <div className="max-w-sm border border-theme-accent-1 bg-theme-accent-1 shadow-md hover:shadow-lg">
          <Link to="/notes/new" className="">
            <p className="pt-12 text-center font-accent text-4xl">
              Put a message in the bottle
            </p>
            <img
              src="/images/the_bottle_1.png"
              alt="Put a message in the bottle"
              className=""
            ></img>
          </Link>
        </div>

        <div className="max-w-sm border border-theme-accent-1 bg-theme-accent-1 shadow-md hue-rotate-180 hover:shadow-lg">
          <Link to="/notes/take" className="">
            <p className="pt-12 text-center font-accent text-4xl">
              Take a message from the bottle
            </p>
            <img
              src="/images/the_bottle_1.png"
              alt="Take a message from the bottle"
              className=""
            ></img>
          </Link>
        </div>
      </div>
    </div>
  );
}
