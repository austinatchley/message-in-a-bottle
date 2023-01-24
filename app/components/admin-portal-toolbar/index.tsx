import { Link } from "@remix-run/react";
import GenericToolbar from "../generic-toolbar";

export default function AdminPortalToolbar() {
    return (
        <GenericToolbar
            titleMessage="message_in_a_bottle_"
            titleLinkUrl="/"
            menuMessage="Admin Portal"
            menuLinkUrl="/admin"
        />
    );
}