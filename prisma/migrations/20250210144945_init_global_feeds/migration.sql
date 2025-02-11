-- AlterTable
ALTER TABLE "Global" ADD COLUMN     "approval_rate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "average_response_time" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "training_progress" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "contrib_30_days" SET DEFAULT 0,
ALTER COLUMN "token_distributions" SET DEFAULT 0,
ALTER COLUMN "data_point_submitted" SET DEFAULT 0,
ALTER COLUMN "total_submissions" SET DEFAULT 0;
