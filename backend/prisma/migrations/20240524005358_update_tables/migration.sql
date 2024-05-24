-- CreateTable
CREATE TABLE "Paymentslip" (
    "paymentslipId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" INTEGER NOT NULL,
    "codBarras" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Paymentslipinstallment" (
    "paymentslipInstallmentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "paymentslipId" INTEGER NOT NULL,
    "installmentIds" INTEGER NOT NULL,
    "totalAmount" REAL NOT NULL
);
