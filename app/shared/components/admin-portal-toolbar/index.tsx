
import { Link } from "@remix-run/react";

export default function AdminPortalToolbar() {
    return (
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-3xl font-bold font-title">
                <Link to="/">message_in_a_bottle_</Link>
            </h1>

            <div className="bg-slate-500 hover:bg-sky-800 min-w-20">
                <h1 className="text-2xl px-2 text-stone-100 font-medium text-center underline-offset-8">
                    <Link to="/admin">Admin Portal</Link>
                </h1>
            </div>
        </header>
    );
}