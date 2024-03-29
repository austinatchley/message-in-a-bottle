import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MenuToolbar } from "~/components/menu-toolbar";

export async function loader({ request }: LoaderArgs) {
  return null;
}

export default function About() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex h-full min-h-screen flex-col">
      <header>
        <MenuToolbar />
      </header>

      <main className="flex h-full bg-theme-white">
        <div className="container m-auto w-full max-w-lg rounded border-2 border-theme-primary bg-theme-white shadow">
          <div className="w-full bg-theme-accent-2 py-4">
            <span className="pl-4 font-title text-white">About</span>
          </div>
          <div className="w-full p-8">
            <p>
              This project is a work-in-progress. Eventually, it will serve as a
              platform for users to anonymously send and receive messages from
              bottles which are tied to physical location and only accessible by
              QR code.
            </p>
            <br></br>
            <div className="text-center text-blue-600">
              <a href="https://github.com/austinatchley/message-in-a-bottle">
                See the latest progress on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
