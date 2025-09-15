/*
  Warnings:

  - Added the required column `description` to the `Entitlement` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Entitlement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Entitlement" ("id", "level", "name", "type") SELECT "id", "level", "name", "type" FROM "Entitlement";
DROP TABLE "Entitlement";
ALTER TABLE "new_Entitlement" RENAME TO "Entitlement";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
