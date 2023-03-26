import { prisma } from "~/db.server";
import type { Note, Prisma } from "@prisma/client";

// TODO: Implement types for each server-side function
export type GetNoteReturnType = Prisma.PromiseReturnType<typeof getNote>;
export function getNote(
  { id }: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true, createdAt: true },
    where: { id },
  });
}

export function getNotes() {
  return prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });
}

export function createNote({
  body,
  title
}: Pick<Note, "body" | "title">) {
  return prisma.note.create({
    data: {
      title,
      body,
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
