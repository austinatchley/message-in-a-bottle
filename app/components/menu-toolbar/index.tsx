import { GenericToolbar } from "~/components/generic-toolbar";

export function MenuToolbar() {
    return (
        <GenericToolbar
            titleMessage="message~in~a~bottle"
            titleLinkUrl="/"
            menuMessage="Home"
            menuLinkUrl="/"
        />
    );
}