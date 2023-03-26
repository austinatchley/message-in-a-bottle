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
        <div className="mx-auto max-w-sm sm:max-w-xl lg:max-w-4xl w-full px-8 sm:px-0">
            <div className="mx-auto box-border max-w-lg border-2 border-stone-800 rounded-md bg-slate-200">
                <h1 className="p-8 text-2xl text-bold font-title text-center">{bottle.title}</h1>
            </div>

            { /* TODO: Add functionality to destroy notes after they have been read. Rate limit note retrieval per user */ }
            <div className="relative w-full pb-20">
                <div className="w-full flex mx-auto py-4 ml-4">
                    {
                        note ? (
                            <div className="mx-auto">
                                <NoteView
                                    key={note.id}
                                    note={note}
                                />
                            </div>
                        ) : null
                    }
                </div>
            </div>
            <hr></hr>

            <div className="px-4 py-10 flex justify-around h-full w-full">
                <div className="w-200 h-64 py-4">
                    <Link to={`/notes/new?bottleId=${bottle.id}`} >
                        <button
                            className="rounded bg-blue-500 py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
                        >
                            Create a new note in this bottle
                        </button>
                    </Link>
                </div>

                <div className="w-64 h-64">
                    <h3 className="text-xl font-bold text-center">Generated QR Code</h3>
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