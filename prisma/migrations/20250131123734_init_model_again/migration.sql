-- AlterTable
ALTER TABLE "User" ADD COLUMN     "total_claimable" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "total_earned" SET DEFAULT 0,
ALTER COLUMN "total_claimed" SET DEFAULT 0,
ALTER COLUMN "claimable" SET DEFAULT 0,
ALTER COLUMN "submissions" SET DEFAULT 0,
ALTER COLUMN "approved" SET DEFAULT 0;
