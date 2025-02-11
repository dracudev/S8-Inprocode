-- CreateTable
CREATE TABLE "Events" (
    "id_event" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT[],
    "location" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "category_color" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id_event")
);

-- CreateIndex
CREATE UNIQUE INDEX "Events_title_key" ON "Events"("title");
