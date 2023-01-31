import { Link } from "@remix-run/react";

interface IProps {
    titleMessage: string;
    titleLinkUrl: string;
    menuMessage: string;
    menuLinkUrl: string;
}

export default function GenericToolbar({ titleMessage, titleLinkUrl, menuMessage, menuLinkUrl }: IProps) {
    return (
        <header className="flex items-center justify-between bg-slate-800 p-4 text-white">
            <h1 className="flex items-center h-8 w-48 text-3xl font-bold font-title">
                <Link to={titleLinkUrl}>{titleMessage}</Link>
            </h1>

            <div className="flex justify-end items-center bg-slate-500 hover:bg-sky-800 min-w-20">
                <h1 className="text-2xl px-2 text-stone-100 font-medium text-center">
                    <Link to={menuLinkUrl}>{menuMessage}</Link>
                </h1>
            </div>
        </header>
    );
}