import { prisma } from "~/db.server";
import type { Note, Prisma } from "@prisma/client";

export type GetNoteReturnType = Prisma.PromiseReturnType<typeof getNote>;
export async function getNote({ id }: Pick<Note, "id">) {
  return prisma.note.findUnique({
    select: { id: true, body: true, title: true, createdAt: true },
    where: { id },
  });
}

export type GetFirstNoteReturnType = Prisma.PromiseReturnType<
  typeof getFirstNote
>;
export async function getFirstNote() {
  // TODO: Implement a better note selection strategy

  // Returns the first note it finds
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true, createdAt: true },
  });
}

export type TakeNoteReturnType = Prisma.PromiseReturnType<typeof takeNote>;
export async function takeNote({ id }: Pick<Note, "id">) {
  // Take a note and delete it from the DB
  const note: GetNoteReturnType = await getNote({ id });
  if (!note) {
    return null;
  }

  await prisma.note.delete({
    where: {
      id: note.id,
    },
  });

  return note;
}

export type GetNotesReturnType = Prisma.PromiseReturnType<typeof getNotes>;
export async function getNotes() {
  return prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });
}

export type CreateNoteReturnType = Prisma.PromiseReturnType<typeof createNote>;
export async function createNote({
  body,
  title,
}: Pick<Note, "body" | "title">) {
  return prisma.note.create({
    data: {
      title,
      body,
    },
  });
}

export type DeleteNoteReturnType = Prisma.PromiseReturnType<typeof deleteNote>;
export async function deleteNote({ id }: Pick<Note, "id">) {
  return prisma.note.deleteMany({
    where: { id },
  });
}
