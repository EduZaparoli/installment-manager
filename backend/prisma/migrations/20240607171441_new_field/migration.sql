/*
  Warnings:

  - Added the required column `issuanceDate` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentSlip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "barCode" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "issuanceDate" DATETIME NOT NULL,
    "html" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "payer" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentDate" DATETIME
);
INSERT INTO "new_PaymentSlip" ("barCode", "dueDate", "html", "id", "payer", "paymentDate", "status", "value") SELECT "barCode", "dueDate", "html", "id", "payer", "paymentDate", "status", "value" FROM "PaymentSlip";
DROP TABLE "PaymentSlip";
ALTER TABLE "new_PaymentSlip" RENAME TO "PaymentSlip";
PRAGMA foreign_key_check("PaymentSlip");
PRAGMA foreign_keys=ON;
