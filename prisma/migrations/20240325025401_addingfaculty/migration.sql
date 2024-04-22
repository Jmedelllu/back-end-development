-- CreateTable
CREATE TABLE "menu" (
    "no" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "price" VARCHAR(255),

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);