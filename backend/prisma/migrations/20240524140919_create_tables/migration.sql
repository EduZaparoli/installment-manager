-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PaymentSlip" (
    "paymentSlipId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "barCode" TEXT NOT NULL,
    "paymentSlipInstallmentId" INTEGER NOT NULL,
    CONSTRAINT "PaymentSlip_paymentSlipInstallmentId_fkey" FOREIGN KEY ("paymentSlipInstallmentId") REFERENCES "PaymentSlipInstallment" ("paymentSlipInstallmentId") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PaymentSlipInstallment" (
    "paymentSlipInstallmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentSlipId" INTEGER NOT NULL,
    "installmentIds" TEXT NOT NULL,
    "totalAmount" REAL NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSlip_paymentSlipInstallmentId_key" ON "PaymentSlip"("paymentSlipInstallmentId");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSlipInstallment_paymentSlipId_key" ON "PaymentSlipInstallment"("paymentSlipId");
