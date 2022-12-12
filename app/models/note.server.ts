import { prisma } from "~/db.server";
import type { Note } from "@prisma/client";

export function getNote(
  { id }: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, body: true, title: true, xpos: true, ypos: true },
    where: { id },
  });
}

export function getNotes() {
  return prisma.note.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getOverlappingNotes({ xpos, ypos }: Pick<Note, "xpos" | "ypos">) {
  return prisma.note.findMany({
    select: { id: true, xpos: true, ypos: true },
    orderBy: { createdAt: "desc" },
  });
}

export function createNote({
  body,
  title,
  xpos,
  ypos
}: Pick<Note, "body" | "title" | "xpos" | "ypos">) {
  return prisma.note.create({
    data: {
      title,
      body,
      xpos,
      ypos
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
