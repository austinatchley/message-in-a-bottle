import { prisma } from "~/db.server";
import type { Board } from "@prisma/client";

export function getBoard(
  { id }: Pick<Board, "id">) {
  return prisma.board.findFirst({
    select: { id: true, title: true, notes: true },
    where: { id },
  });
}

export function getBoards() {
  return prisma.board.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getNotesInBoard(
  { id }: Pick<Board, "id">) {
  return prisma.board.findUnique({
    where: { id: id },
    include: { notes: true }
  });
}

export function createBoard({
  title
}: Pick<Board, "title">) {
  return prisma.board.create({
    data: {
      title,
    },
  });
}

export function deleteBoard({
  id,
}: Pick<Board, "id">) {
  return prisma.board.deleteMany({
    where: { id },
  });
}
