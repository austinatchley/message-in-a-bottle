import type { Note } from "@prisma/client";
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
  const { title, body, createdAt } = note;

  return (
    <div className="shadow-black-500/50 bg-theme-note relative box-border h-64 w-64 border-4 p-4 shadow-lg">
      <p className="py-2 font-semibold">{title}</p>
      <p className="py-2 font-thin">{body}</p>
      <br></br>
      <div className="absolute inset-x-0 bottom-4 left-1 grid place-items-center">
        <p className="text-xs font-extralight">
          {formatDate(createdAt.toISOString())}
        </p>
      </div>
    </div>
  );
}
