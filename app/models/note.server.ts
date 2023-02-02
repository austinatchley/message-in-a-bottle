import { prisma } from "~/db.server";
import type { Note } from "@prisma/client";

export function getNote(
  { id }: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, boardId: true, body: true, title: true, xpos: true, ypos: true, createdAt: true },
    where: { id },
  });
}

export function getNotes() {
  return prisma.note.findMany({
    select: { id: true, title: true, xpos: true, ypos: true },
    orderBy: { createdAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  xpos,
  ypos,
  boardId
}: Pick<Note, "body" | "title" | "xpos" | "ypos" | "boardId">) {
  return prisma.note.create({
    data: {
      title,
      body,
      xpos,
      ypos,
      boardId
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
