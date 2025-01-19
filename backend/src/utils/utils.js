import { createRequire } from "node:module";
import path from "node:path";

// Custom implementation of readJSON
const require = createRequire(import.meta.url);
export const readJSON = (relativePath) => {
  const absolutePath = path.resolve(relativePath);
  console.log(`Reading JSON from: ${absolutePath}`); // Log the path for debugging
  return require(absolutePath);
};
