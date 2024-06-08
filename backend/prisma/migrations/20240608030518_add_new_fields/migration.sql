/*
  Warnings:

  - You are about to drop the column `installmentId` on the `PaymentSlipInstallmentItem` table. All the data in the column will be lost.
  - Added the required column `date` to the `PaymentSlipInstallmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `PaymentSlipInstallmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purchaseId` to the `PaymentSlipInstallmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `PaymentSlipInstallmentItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `documentNumber` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentSlipInstallmentItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentSlipInstallmentId" INTEGER NOT NULL,
    "purchaseId" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    CONSTRAINT "PaymentSlipInstallmentItem_paymentSlipInstallmentId_fkey" FOREIGN KEY ("paymentSlipInstallmentId") REFERENCES "PaymentSlipInstallment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PaymentSlipInstallmentItem" ("id", "paymentSlipInstallmentId") SELECT "id", "paymentSlipInstallmentId" FROM "PaymentSlipInstallmentItem";
DROP TABLE "PaymentSlipInstallmentItem";
ALTER TABLE "new_PaymentSlipInstallmentItem" RENAME TO "PaymentSlipInstallmentItem";
CREATE TABLE "new_PaymentSlip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "barCode" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "issuanceDate" DATETIME NOT NULL,
    "html" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "payer" TEXT NOT NULL,
    "documentNumber" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentDate" DATETIME
);
INSERT INTO "new_PaymentSlip" ("barCode", "dueDate", "html", "id", "issuanceDate", "payer", "paymentDate", "status", "value") SELECT "barCode", "dueDate", "html", "id", "issuanceDate", "payer", "paymentDate", "status", "value" FROM "PaymentSlip";
DROP TABLE "PaymentSlip";
ALTER TABLE "new_PaymentSlip" RENAME TO "PaymentSlip";
PRAGMA foreign_key_check("PaymentSlipInstallmentItem");
PRAGMA foreign_key_check("PaymentSlip");
PRAGMA foreign_keys=ON;
