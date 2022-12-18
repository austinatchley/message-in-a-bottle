import { prisma } from "~/db.server";
import type { Board } from "@prisma/client";

export function getBoard(
  { id }: Pick<Board, "id">) {
  return prisma.board.findFirst({
    select: { id: true },
    where: { id },
  });
}

export function getBoards() {
  return prisma.board.findMany({
    select: { id: true, title: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getBoardsInBoard(
  { id, notes }: Pick<Board, "id" | "notes">) {
  return prisma.board.findFirst({
    select: { id: true, notes: true },
    where: { id },
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
