import { Link } from "@remix-run/react";

interface GenericToolbarProps {
    titleMessage: string; // TODO: This has been replaced with the logo. Remove this field and references to it
    titleLinkUrl: string;
    menuMessage: string;
    menuLinkUrl: string;
}

export default function GenericToolbar({ titleMessage, titleLinkUrl, menuMessage, menuLinkUrl }: GenericToolbarProps) {
    return (
        <div className="flex justify-between items-center bg-slate-800 p-2 text-yellow-400">
            <Link to={titleLinkUrl} className="flex items-center w-full h-full">
                <div className="mx-4">
                    <img src="/images/logo.png"></img>
                </div>
            </Link>

            <div className="flex justify-end items-center m-2 bg-slate-500 hover:bg-sky-800 min-w-20">
                <h1 className="text-2xl px-2 text-stone-100 text-center">
                    <Link to={menuLinkUrl}>{menuMessage}</Link>
                </h1>
            </div>
        </div>
    );
}