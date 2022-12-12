/*
  Warnings:

  - Added the required column `xpos` to the `Note` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ypos` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "xpos" INTEGER NOT NULL,
ADD COLUMN     "ypos" INTEGER NOT NULL;
