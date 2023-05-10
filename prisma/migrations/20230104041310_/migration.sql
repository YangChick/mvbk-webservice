-- CreateTable
CREATE TABLE "movies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "movieDuration" TEXT NOT NULL,
    "limitedAudience" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "releaseDate" TEXT NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "ticketId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalMoney" TEXT NOT NULL,
    "paymentId" TEXT NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "paymentName" TEXT NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "food" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "food_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ticket" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "showTimeId" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "showTime" (
    "id" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "showTime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seats" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "typeSeatId" TEXT NOT NULL,

    CONSTRAINT "seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "typeSeat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,

    CONSTRAINT "typeSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FoodToInvoices" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "movies_id_key" ON "movies"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "payments_id_key" ON "payments"("id");

-- CreateIndex
CREATE UNIQUE INDEX "food_id_key" ON "food"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ticket_id_key" ON "ticket"("id");

-- CreateIndex
CREATE UNIQUE INDEX "showTime_id_key" ON "showTime"("id");

-- CreateIndex
CREATE UNIQUE INDEX "seats_id_key" ON "seats"("id");

-- CreateIndex
CREATE UNIQUE INDEX "typeSeat_id_key" ON "typeSeat"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_FoodToInvoices_AB_unique" ON "_FoodToInvoices"("A", "B");

-- CreateIndex
CREATE INDEX "_FoodToInvoices_B_index" ON "_FoodToInvoices"("B");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ticket" ADD CONSTRAINT "ticket_showTimeId_fkey" FOREIGN KEY ("showTimeId") REFERENCES "showTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_typeSeatId_fkey" FOREIGN KEY ("typeSeatId") REFERENCES "typeSeat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToInvoices" ADD CONSTRAINT "_FoodToInvoices_A_fkey" FOREIGN KEY ("A") REFERENCES "food"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FoodToInvoices" ADD CONSTRAINT "_FoodToInvoices_B_fkey" FOREIGN KEY ("B") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;
