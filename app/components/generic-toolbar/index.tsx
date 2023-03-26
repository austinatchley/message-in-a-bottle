import { Link } from "@remix-run/react";

interface GenericToolbarProps {
  titleMessage: string; // TODO: This has been replaced with the logo. Remove this field and references to it
  titleLinkUrl: string;
  menuMessage: string;
  menuLinkUrl: string;
}

export function GenericToolbar({
  titleMessage,
  titleLinkUrl,
  menuMessage,
  menuLinkUrl,
}: GenericToolbarProps) {
  return (
    <div className="flex items-center justify-between bg-slate-800 p-2 text-yellow-400">
      <Link to={titleLinkUrl} className="flex h-full w-full items-center">
        <div className="mx-4">
          <img src="/images/logo.png"></img>
        </div>
      </Link>

      <div className="min-w-20 m-2 flex items-center justify-end bg-slate-500 hover:bg-sky-800">
        <h1 className="px-2 text-center text-2xl text-stone-100">
          <Link to={menuLinkUrl}>{menuMessage}</Link>
        </h1>
      </div>
    </div>
  );
}
