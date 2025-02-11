import fs from "fs";
import path from "path";

export const readJSON = (relativePath) => {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  // console.log("Resolved path:", absolutePath);
  return JSON.parse(fs.readFileSync(absolutePath, "utf-8"));
};
