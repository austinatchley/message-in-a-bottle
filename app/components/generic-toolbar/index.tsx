import { Link } from "@remix-run/react";

interface GenericToolbarProps {
    titleMessage: string;
    titleLinkUrl: string;
    menuMessage: string;
    menuLinkUrl: string;
}

export default function GenericToolbar({ titleMessage, titleLinkUrl, menuMessage, menuLinkUrl }: GenericToolbarProps) {
    return (
        <div className="flex items-center justify-between bg-slate-800 p-4 text-yellow-400">
            <Link to={titleLinkUrl} className="flex flex-row w-full">
                <span className="w-6 h-6 mx-4">
                    <img src="the_bottle_1.png"></img>
                </span>

                <h1 className="text-left h-8 w-full text-2xl font-bold font-title italic">
                    {titleMessage}
                </h1>
            </Link>

            <div className="flex justify-end items-center bg-slate-500 hover:bg-sky-800 min-w-20">
                <h1 className="text-2xl px-2 text-stone-100 text-center">
                    <Link to={menuLinkUrl}>{menuMessage}</Link>
                </h1>
            </div>
        </div>
    );
}