import fs from "fs";
import path from "path";

export const readJSON = (relativePath) => {
  // Resolve the absolute path based on the relative one
  const absolutePath = path.resolve(relativePath);

  // Read the file content and parse it as JSON
  const data = fs.readFileSync(absolutePath, "utf-8");
  return JSON.parse(data);
};
