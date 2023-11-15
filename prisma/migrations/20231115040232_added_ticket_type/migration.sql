-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('BUG', 'FEATURE');

-- AlterTable
ALTER TABLE "tickets" ADD COLUMN     "type" "TicketType" NOT NULL DEFAULT 'BUG';
