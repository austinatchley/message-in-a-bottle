import { prisma } from "~/db.server";
import type { Note } from "@prisma/client";

export function getNote(
  { id }: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id },
  });
}

export function getNoteListItems({ userId }: { userId: string }) {
  return prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });
}

export function createNote({
  body,
  title,
}: Pick<Note, "body" | "title">) {
  return prisma.note.create({
    data: {
      title,
      body
    },
  });
}

export function deleteNote({
  id,
}: Pick<Note, "id">) {
  return prisma.note.deleteMany({
    where: { id },
  });
}
