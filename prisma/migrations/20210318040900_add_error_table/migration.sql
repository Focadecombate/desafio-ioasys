-- CreateTable
CREATE TABLE "Error" (
    "id" TEXT NOT NULL,
    "stack" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);
