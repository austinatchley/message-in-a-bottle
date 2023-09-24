import { NoteView } from "../note-view";
import { QrCode } from "../qr-code";
import { Link } from "@remix-run/react";

interface BottleBoardViewProps {
  bottle: any;
  notes: Array<any> | undefined;
}

export default function BottleBoardView({
  bottle,
  notes,
}: BottleBoardViewProps) {
  return (
    <div className="mx-auto w-full max-w-sm px-8 sm:max-w-xl sm:px-0 lg:max-w-4xl">
      <div className="pb-4">
        <h1 className="text-bold text-left font-title text-2xl">
          {bottle.title}
        </h1>
      </div>

      <div className="relative box-border w-full rounded-md border-2 border-stone-800 bg-slate-200">
        <div className="w-full rounded-md bg-sky-200 px-4 py-3">
          <div className="text-left text-xl font-medium text-black">Notes</div>
        </div>

        <div className="relative ml-4 grid grid-cols-3 gap-4 py-4 lg:grid-cols-4">
          {notes?.map((note) => (
            <NoteView
              key={note.id}
              note={note}
            />
          ))}
        </div>
      </div>

      <div className="pt-20"></div>
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
