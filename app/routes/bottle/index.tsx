import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <div className="mx-auto flex h-full gap-4 py-16 lg:py-48 w-full flex-row justify-evenly sm:px-32">
      <div className="max-w-[18rem] grow border border-theme-accent-1 bg-theme-accent-1 shadow-md hover:shadow-lg">
        <Link to="/notes/new" className="flex h-full flex-col">
          <p className="grow pt-12 text-center font-accent text-4xl">
            Put a message in the bottle
          </p>
          <img
            src="/images/the_bottle_1.png"
            alt="Put a message in the bottle"
            className=""
          ></img>
        </Link>
      </div>

      <div className="max-w-[18rem] grow border border-theme-accent-1 bg-theme-accent-1 shadow-md hue-rotate-180 hover:shadow-lg">
        <Link to="/notes/take" className="flex h-full flex-col">
          <p className="grow pt-12 text-center font-accent text-4xl">
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
  );
}
