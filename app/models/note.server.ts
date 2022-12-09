import { prisma } from "~/db.server";

/**
 * Custom Note Model
 * 
 */
export type Note = {
  id: string
  title: string
  body: string
  createdAt: Date
}

export function getNote(
  id: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true },
    where: { id },
  });
}

export function getNoteListItems(userId: string) {
  return prisma.note.findMany({
    // where {},
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
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
