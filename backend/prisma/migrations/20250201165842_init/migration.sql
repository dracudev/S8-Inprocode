-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile');

-- CreateEnum
CREATE TYPE "Genre" AS ENUM ('Action', 'Adventure', 'RPG', 'Strategy', 'Simulation', 'Sports', 'Puzzle', 'Idle', 'FPS', 'VR', 'Roguelike', 'Sci-Fi', 'Racing', 'Open World', 'TPS', 'Platformer', 'Multiplayer', 'Social', 'Shooter', 'Battle Royale', 'Party', 'Augmented Reality');

-- CreateTable
CREATE TABLE "User" (
    "id_user" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "roles" VARCHAR(100) NOT NULL,
    "photo" VARCHAR(100),
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Game" (
    "id_game" SERIAL NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "year" INTEGER,
    "photo" VARCHAR(500),
    "platform" VARCHAR(200) NOT NULL,
    "genre" VARCHAR(300) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id_game")
);

-- CreateTable
CREATE TABLE "_GameToUser" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GameToUser_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Game_title_key" ON "Game"("title");

-- CreateIndex
CREATE INDEX "_GameToUser_B_index" ON "_GameToUser"("B");

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Game"("id_game") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameToUser" ADD CONSTRAINT "_GameToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;
