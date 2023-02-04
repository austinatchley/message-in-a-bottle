import { Link } from "@remix-run/react";

interface GenericToolbarProps {
    titleMessage: string;
    titleLinkUrl: string;
    menuMessage: string;
    menuLinkUrl: string;
}

export default function GenericToolbar({ titleMessage, titleLinkUrl, menuMessage, menuLinkUrl }: GenericToolbarProps) {
    return (
        <div className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="text-left h-8 w-full text-3xl font-bold font-title italic">
                <Link to={titleLinkUrl}>{titleMessage}</Link>
            </h1>

            <div className="flex justify-end items-center bg-slate-500 hover:bg-sky-800 min-w-20">
                <h1 className="text-2xl px-2 text-stone-100 text-center">
                    <Link to={menuLinkUrl}>{menuMessage}</Link>
                </h1>
            </div>
        </div>
    );
}