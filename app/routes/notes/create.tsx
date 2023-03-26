import { LoaderArgs, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

export async function loader({ request, params }: LoaderArgs) {
    return json({});
}

export default function CreateNotePage() {
    const data = useLoaderData<typeof loader>();

    return (
        <div className="flex flex-col w-full h-full mx-auto">
            <div className="m-auto bg-slate-100 rounded shadow border-slate-800 border-2">
                <div className="py-4 bg-slate-600 w-full">
                    <label className="text-white pl-4 font-title">
                        <span>
                            New Note
                        </span>
                    </label>
                </div>

                <div className="flex flex-col justify-between h-fit">
                    <div className="p-20">
                        Created successfully!
                    </div>

                    <div className="w-full h-full py-2 bg-yellow-500 text-center text-slate-100">
                        <Link to="/bottle">
                            Return to bottle
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}