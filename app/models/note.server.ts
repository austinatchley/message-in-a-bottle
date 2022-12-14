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
    select: { id: true, title: true, xpos: true, ypos: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getNotesFullRepresentation() {
  return prisma.note.findMany();
}

export function getOverlappingNotes({ xpos, ypos }: Pick<Note, "xpos" | "ypos">) {
  // TODO
  const getOverlappingValues = (pos: number) => {
    return { xMinBoundary: 1, xMaxBoundary: 1, yMinBoundary: 1, yMaxBoundary: 1 };
  }

  const { xMinBoundary, xMaxBoundary, yMinBoundary, yMaxBoundary } = getOverlappingValues(xpos);

  return prisma.note.findMany({
    select: { id: true, xpos: true, ypos: true },
    where: {
      xpos: {
        gt: xMinBoundary,
        lt: xMaxBoundary
      },
      ypos: {
        gt: yMinBoundary,
        lt: yMaxBoundary
      }
    },
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
