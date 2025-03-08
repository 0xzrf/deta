-- CreateTable
CREATE TABLE "Waitlist" (
    "referral_code" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Waitlist_pkey" PRIMARY KEY ("referral_code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waitlist_referral_code_key" ON "Waitlist"("referral_code");
