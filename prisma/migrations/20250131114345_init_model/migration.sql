-- CreateTable
CREATE TABLE "User" (
    "address" TEXT NOT NULL,
    "total_earned" INTEGER NOT NULL,
    "total_claimed" INTEGER NOT NULL,
    "claimable" INTEGER NOT NULL,
    "submissions" INTEGER NOT NULL,
    "approved" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Global" (
    "id" SERIAL NOT NULL,
    "contrib_30_days" INTEGER NOT NULL,
    "token_distributions" INTEGER NOT NULL,
    "data_point_submitted" INTEGER NOT NULL,
    "total_submissions" INTEGER NOT NULL,

    CONSTRAINT "Global_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_address_key" ON "User"("address");
