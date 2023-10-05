import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <div className="h-full w-full">
      <div className="m-auto flex h-screen w-fit flex-row gap-20">
        <div className="my-auto max-w-sm border border-theme-accent-1 bg-blue-200 shadow-md hover:shadow-lg">
          <Link to="/notes/new" className="h-full w-full">
            <p className="pt-12 text-center font-accent text-4xl">
              Put a message in the bottle
            </p>
            <div className="h-full w-full pt-2">
              <img
                src="/images/the_bottle_1.png"
                alt="Put a message in the bottle"
                className="mx-auto h-full w-full object-contain"
              ></img>
            </div>
          </Link>
        </div>

        <div className="my-auto max-w-sm border border-theme-accent-1 bg-blue-200 shadow-md hue-rotate-180 hover:shadow-lg">
          <Link to="/notes/take" className="h-full w-full">
            <p className="pt-12 text-center font-accent text-4xl">
              Take a message from the bottle
            </p>
            <div className="h-full w-full pt-2">
              <img
                src="/images/the_bottle_1.png"
                alt="Take a message from the bottle"
                className="mx-auto h-full w-full object-contain"
              ></img>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
