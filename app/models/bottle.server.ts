import { prisma } from "~/db.server";
import type { Prisma, Bottle } from "@prisma/client";

export type GetBottleReturnType = Prisma.PromiseReturnType<typeof getBottle>;
export async function getBottle(
  { id }: Pick<Bottle, "id">) {
  return prisma.bottle.findFirst({
    select: { id: true, title: true, notes: true },
    where: { id },
  });
}

export type GetBottleWithNotesReturnType = Prisma.PromiseReturnType<typeof getBottleWithNotes>;
export async function getBottleWithNotes(
  { id }: Pick<Bottle, "id">) {
  return prisma.bottle.findUnique({
    where: { id: id },
    include: { notes: true }
  });
}

export type GetBottlesReturnType = Prisma.PromiseReturnType<typeof getBottles>;
export async function getBottles() {
  return prisma.bottle.findMany({
    select: { id: true, title: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
}

export type GetNotesInBottleReturnType = Prisma.PromiseReturnType<typeof getNotesInBottle>;
export async function getNotesInBottle(
  { id }: Pick<Bottle, "id">) {
    const bottle: GetBottleWithNotesReturnType = await getBottleWithNotes({ id });
    if (!bottle) {
      throw new Error(`Bottle ${id} not found`);
    }

  return bottle.notes;
}

export type CreateBottleReturnType = Prisma.PromiseReturnType<typeof getBottle>;
export async function createBottle({
  title
}: Pick<Bottle, "title">) {
  return prisma.bottle.create({
    data: {
      title,
    },
  });
}

export type DeleteBottleReturnType = Prisma.PromiseReturnType<typeof getBottle>;
export function deleteBottle({
  id,
}: Pick<Bottle, "id">) {
  return prisma.bottle.deleteMany({
    where: { id },
  });
}
