import { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
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

            <main className="flex h-full bg-stone-100">
                <div className="flex-1 p-6">
                    <div className="w-full max-w-md mx-auto bg-white rounded shadow mt-20">
                        <div className="py-4 bg-blue-600 w-full rounded">
                            <span className="text-white pl-4 font-title">
                                About
                            </span>
                        </div>
                        <div className="p-8">
                            <p>
                                This project is a work-in-progress. Eventually, it will serve as a
                                platform for neighbors to anonymously collaborate to create poetry
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}