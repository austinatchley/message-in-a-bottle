import { Link } from "@remix-run/react";

interface NoteProps {
    id: string;
    title: string;
    body: string;
    createdAt: string;
}

function formatDate(date: string): string {
    const yearMonthDateEnd = date.indexOf("T");
    return date.substring(0, yearMonthDateEnd);
}

export default function Note({ id, title, body, createdAt }: NoteProps) {
    return (
        <div
            key={id}
            className="box-border relative h-64 w-64 p-4 border-4 bg-yellow-100 shadow-lg shadow-black-500/50">
            <p className="py-2 font-semibold">{title}</p>
            <p className="py-2 font-thin">{body}</p>
            <br></br>
            <div className="absolute inset-x-0 bottom-4 left-1 grid place-items-center">
                <p className="text-xs font-extralight">{formatDate(createdAt)}</p>
            </div>
        </div>
    );
}