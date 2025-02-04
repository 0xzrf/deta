/*
  Warnings:

  - You are about to drop the column `approved` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `submissions` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_claimable` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `total_earned` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "approved",
DROP COLUMN "submissions",
DROP COLUMN "total_claimable",
DROP COLUMN "total_earned";
