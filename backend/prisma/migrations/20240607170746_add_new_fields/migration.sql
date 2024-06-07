/*
  Warnings:

  - The primary key for the `PaymentSlip` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `paymentSlipId` on the `PaymentSlip` table. All the data in the column will be lost.
  - You are about to drop the column `paymentSlipInstallmentId` on the `PaymentSlip` table. All the data in the column will be lost.
  - The primary key for the `PaymentSlipInstallment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `installmentIds` on the `PaymentSlipInstallment` table. All the data in the column will be lost.
  - You are about to drop the column `paymentSlipInstallmentId` on the `PaymentSlipInstallment` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `PaymentSlipInstallment` table. All the data in the column will be lost.
  - Added the required column `dueDate` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `html` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payer` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `PaymentSlip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `PaymentSlipInstallment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalValue` to the `PaymentSlipInstallment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "PaymentSlipInstallmentItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentSlipInstallmentId" INTEGER NOT NULL,
    "installmentId" INTEGER NOT NULL,
    CONSTRAINT "PaymentSlipInstallmentItem_paymentSlipInstallmentId_fkey" FOREIGN KEY ("paymentSlipInstallmentId") REFERENCES "PaymentSlipInstallment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PaymentSlip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "barCode" TEXT NOT NULL,
    "dueDate" DATETIME NOT NULL,
    "html" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "payer" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "paymentDate" DATETIME
);
INSERT INTO "new_PaymentSlip" ("barCode") SELECT "barCode" FROM "PaymentSlip";
DROP TABLE "PaymentSlip";
ALTER TABLE "new_PaymentSlip" RENAME TO "PaymentSlip";
CREATE TABLE "new_PaymentSlipInstallment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "totalValue" REAL NOT NULL,
    "paymentSlipId" INTEGER,
    CONSTRAINT "PaymentSlipInstallment_paymentSlipId_fkey" FOREIGN KEY ("paymentSlipId") REFERENCES "PaymentSlip" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PaymentSlipInstallment" ("paymentSlipId") SELECT "paymentSlipId" FROM "PaymentSlipInstallment";
DROP TABLE "PaymentSlipInstallment";
ALTER TABLE "new_PaymentSlipInstallment" RENAME TO "PaymentSlipInstallment";
PRAGMA foreign_key_check("PaymentSlip");
PRAGMA foreign_key_check("PaymentSlipInstallment");
PRAGMA foreign_keys=ON;
