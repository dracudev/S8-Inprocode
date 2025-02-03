import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

//  npx prisma migrate dev --name rename_tables
//  npx prisma generate
//  npx prisma db seed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prisma = new PrismaClient();

const loadJson = (filename) => {
  const filePath = path.join(__dirname, "../public/data", filename);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileContent);
};

async function main() {
  try {
    // Clear existing data
    await prisma.game.deleteMany();
    await prisma.user.deleteMany();

    // Load data from JSON files
    const users = loadJson("users.json");
    const games = loadJson("games.json");

    // Insert users
    console.log("Seeding users...");
    for (const user of users) {
      await prisma.user.create({
        data: {
          ...user,
          roles: Array.isArray(user.roles) ? user.roles.join(",") : user.roles,
          created_at: user.created_at || new Date(),
        },
      });
    }

    // Insert games
    console.log("Seeding games...");
    for (const game of games) {
      await prisma.game.create({
        data: {
          ...game,
          platform: Array.isArray(game.platform)
            ? game.platform.join(",")
            : game.platform,
          genre: Array.isArray(game.genre) ? game.genre.join(",") : game.genre,
        },
      });
    }

    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
