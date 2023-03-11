import { Link } from "@remix-run/react";

export default function BoardIndexPage() {
  return (
    <p>
      No board selected. Select a board on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new board.
      </Link>
    </p>
  );
}
