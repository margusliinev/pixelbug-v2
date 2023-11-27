/*
  Warnings:

  - You are about to drop the `users_projects` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "users_projects" DROP CONSTRAINT "users_projects_projectId_fkey";

-- DropForeignKey
ALTER TABLE "users_projects" DROP CONSTRAINT "users_projects_userId_fkey";

-- DropTable
DROP TABLE "users_projects";
