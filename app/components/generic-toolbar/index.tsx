import { Link } from "@remix-run/react";

interface GenericToolbarProps {
  titleLinkUrl: string;
  menuMessage: string;
  menuLinkUrl: string;
}

export function GenericToolbar({
  titleLinkUrl,
  menuMessage,
  menuLinkUrl,
}: GenericToolbarProps) {
  return (
    <div className="flex items-center justify-between bg-theme-primary p-2 text-theme-secondary">
      <Link to={titleLinkUrl} className="flex h-full w-full items-center">
        <div className="mx-4">
          <img src="/images/logo.png" alt=""></img>
        </div>
      </Link>

      <div className="min-w-20 mx-2 my-1 flex items-center justify-end rounded border border-theme-primary bg-theme-accent-1 hover:bg-theme-secondary">
        <h1 className="px-3 py-1 text-center text-xl text-theme-accent-2">
          <Link to={menuLinkUrl}>{menuMessage}</Link>
        </h1>
      </div>
    </div>
  );
}
