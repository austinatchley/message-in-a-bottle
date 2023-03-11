import { prisma } from "~/db.server";
import type { Note } from "@prisma/client";

export function getNote(
  { id }: Pick<Note, "id">) {
  return prisma.note.findFirst({
    select: { id: true, bottleId: true, body: true, title: true, xpos: true, ypos: true, createdAt: true },
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
  bottleId
}: Pick<Note, "body" | "title" | "xpos" | "ypos" | "bottleId">) {
  return prisma.note.create({
    data: {
      title,
      body,
      xpos,
      ypos,
      bottleId
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
