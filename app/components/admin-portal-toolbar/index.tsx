import { GenericToolbar } from "../generic-toolbar";

export function AdminPortalToolbar() {
    return (
        <GenericToolbar
            titleMessage="message~in~a~bottle"
            titleLinkUrl="/"
            menuMessage="Admin"
            menuLinkUrl="/admin"
        />
    );
}