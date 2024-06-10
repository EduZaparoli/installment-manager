/*
  Warnings:

  - Made the column `payerEmail` on table `PaymentSlip` required. This step will fail if there are existing NULL values in that column.

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
    "documentNumber" TEXT NOT NULL,
    "payerEmail" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentDate" DATETIME,
    "pdf" BLOB
);
INSERT INTO "new_PaymentSlip" ("barCode", "documentNumber", "dueDate", "html", "id", "issuanceDate", "payer", "payerEmail", "paymentDate", "pdf", "status", "value") SELECT "barCode", "documentNumber", "dueDate", "html", "id", "issuanceDate", "payer", "payerEmail", "paymentDate", "pdf", "status", "value" FROM "PaymentSlip";
DROP TABLE "PaymentSlip";
ALTER TABLE "new_PaymentSlip" RENAME TO "PaymentSlip";
PRAGMA foreign_key_check("PaymentSlip");
PRAGMA foreign_keys=ON;
