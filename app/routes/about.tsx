import { LoaderArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import MenuToolbar from "~/components/menu-toolbar";

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

            <main className="flex h-full bg-yellow-400">
                <div className="container w-full max-w-lg m-auto bg-slate-100 rounded shadow border-slate-800 border-2">
                    <div className="py-4 bg-slate-600 w-full">
                        <span className="text-white pl-4 font-title">
                            About
                        </span>
                    </div>
                    <div className="p-8 w-full">
                        <p>
                            This project is a work-in-progress. Eventually, it will serve as a
                            platform for users to anonymously send and receive messages from bottles
                            which are tied to physical location and only accessible by QR code.
                        </p>
                        <br></br>
                        <div className="text-center text-blue-600">
                            <a href="https://www.austinatchley.xyz">
                                See the latest progress on austinatchley.xyz
                            </a>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}