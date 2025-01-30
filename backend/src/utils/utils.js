import fs from "fs";
import path from "path";

export const readJSON = (relativePath) => {
  const absolutePath = path.resolve(process.cwd(), relativePath); // Ensures the path is correct
  return JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
};
