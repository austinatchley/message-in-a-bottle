import { Note } from "@prisma/client";
import { parseISO } from "date-fns";

interface NoteProps {
    note: Note;
}

function formatDate(date: string): string {
    try {
        const parsedDate: Date = parseISO(date);
        return parsedDate.toLocaleString();
    } catch (e: unknown) {
        console.error(e);
        return date;
    }
}

export function NoteView({ note }: NoteProps) {
    const { id, title, body, createdAt } = note;
    const createdAtString: string = note.createdAt.toString();

    return (
        <div
            className="box-border relative h-64 w-64 p-4 border-4 bg-yellow-100 shadow-lg shadow-black-500/50">
            <p className="py-2 font-semibold">{title}</p>
            <p className="py-2 font-thin">{body}</p>
            <br></br>
            <div className="absolute inset-x-0 bottom-4 left-1 grid place-items-center">
                <p className="text-xs font-extralight">{formatDate(createdAtString)}</p>
            </div>
        </div>
    );
}