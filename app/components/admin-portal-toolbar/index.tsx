import GenericToolbar from "../generic-toolbar";

export default function AdminPortalToolbar() {
    return (
        <GenericToolbar
            titleMessage="message~in~a~bottle"
            titleLinkUrl="/"
            menuMessage="Admin Portal"
            menuLinkUrl="/admin"
        />
    );
}