/*
  Warnings:

  - You are about to drop the column `boardId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Board` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_boardId_fkey";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "boardId",
ADD COLUMN     "bottleId" TEXT;

-- DropTable
DROP TABLE "Board";

-- CreateTable
CREATE TABLE "Bottle" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bottle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_bottleId_fkey" FOREIGN KEY ("bottleId") REFERENCES "Bottle"("id") ON DELETE SET NULL ON UPDATE CASCADE;
