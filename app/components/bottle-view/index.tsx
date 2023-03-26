import { NoteView } from "../note-view";
import { QrCode } from "../qr-code";
import { Link } from "@remix-run/react";
import { Note } from "@prisma/client";

interface BottleViewProps {
  bottle: any;
  note?: Note;
}

export function BottleView({ bottle, note }: BottleViewProps) {
  return (
    <div className="mx-auto w-full max-w-sm px-8 sm:max-w-xl sm:px-0 lg:max-w-4xl">
      <div className="mx-auto box-border max-w-lg rounded-md border-2 border-stone-800 bg-slate-200">
        <h1 className="text-bold p-8 text-center font-title text-2xl">
          {bottle.title}
        </h1>
      </div>

      {/* TODO: Add functionality to destroy notes after they have been read. Rate limit note retrieval per user */}
      <div className="relative w-full pb-20">
        <div className="mx-auto ml-4 flex w-full py-4">
          {note ? (
            <div className="mx-auto">
              <NoteView key={note.id} note={note} />
            </div>
          ) : null}
        </div>
      </div>
      <hr></hr>

      <div className="flex h-full w-full justify-around px-4 py-10">
        <div className="w-200 h-64 py-4">
          <Link to={`/notes/new?bottleId=${bottle.id}`}>
            <button className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400">
              Create a new note in this bottle
            </button>
          </Link>
        </div>

        <div className="h-64 w-64">
          <h3 className="text-center text-xl font-bold">Generated QR Code</h3>
          <QrCode
            relativePath={`bottles/${bottle.id}`}
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
