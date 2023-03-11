import { Link } from "@remix-run/react";

export default function BottleIndexPage() {
  return (
    <p>
      No bottle selected. Select a bottle on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new bottle.
      </Link>
    </p>
  );
}
