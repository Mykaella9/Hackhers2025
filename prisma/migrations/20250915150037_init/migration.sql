/*
  Warnings:

  - You are about to drop the `Post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - Added the required column `computerId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Post";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Manager" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Role" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "managerId" INTEGER NOT NULL,
    CONSTRAINT "Role_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Entitlement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_RoleEntitlements" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_RoleEntitlements_A_fkey" FOREIGN KEY ("A") REFERENCES "Entitlement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_RoleEntitlements_B_fkey" FOREIGN KEY ("B") REFERENCES "Role" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UserEntitlements" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_UserEntitlements_A_fkey" FOREIGN KEY ("A") REFERENCES "Entitlement" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UserEntitlements_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "computerId" INTEGER NOT NULL,
    "managerId" INTEGER,
    CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "Manager" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "_RoleEntitlements_AB_unique" ON "_RoleEntitlements"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleEntitlements_B_index" ON "_RoleEntitlements"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserEntitlements_AB_unique" ON "_UserEntitlements"("A", "B");

-- CreateIndex
CREATE INDEX "_UserEntitlements_B_index" ON "_UserEntitlements"("B");
