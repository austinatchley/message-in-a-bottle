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

      <div className="min-w-20 m-2 flex items-center justify-end bg-theme-accent-1 hover:bg-theme-secondary">
        <h1 className="px-2 text-center text-2xl text-theme-accent-2">
          <Link to={menuLinkUrl}>{menuMessage}</Link>
        </h1>
      </div>
    </div>
  );
}
