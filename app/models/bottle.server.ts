import { prisma } from "~/db.server";
import type { Bottle } from "@prisma/client";

export function getBottle(
  { id }: Pick<Bottle, "id">) {
  return prisma.bottle.findFirst({
    select: { id: true, title: true, notes: true },
    where: { id },
  });
}

export function getBottles() {
  return prisma.bottle.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export function getNotesInBottle(
  { id }: Pick<Bottle, "id">) {
  return prisma.bottle.findUnique({
    where: { id: id },
    include: { notes: true }
  });
}

export function createBottle({
  title
}: Pick<Bottle, "title">) {
  return prisma.bottle.create({
    data: {
      title,
    },
  });
}

export function deleteBottle({
  id,
}: Pick<Bottle, "id">) {
  return prisma.bottle.deleteMany({
    where: { id },
  });
}
