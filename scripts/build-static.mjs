import { cp, mkdir, copyFile } from "node:fs/promises";
import { resolve } from "node:path";

const rootDir = process.cwd();
const distDir = resolve(rootDir, "dist");

// Ensure dist directory exists
await mkdir(distDir, { recursive: true });

// Copy static site files to dist for hosting platforms
await copyFile(resolve(rootDir, "index.html"), resolve(distDir, "index.html"));
await copyFile(resolve(rootDir, "styles.css"), resolve(distDir, "styles.css"));
await copyFile(resolve(rootDir, "script.js"), resolve(distDir, "script.js"));

// Copy assets folder if present
try {
  await cp(resolve(rootDir, "assets"), resolve(distDir, "assets"), { recursive: true });
} catch (e) {
  console.log("Assets copy note:", e.message);
}

console.log("Successfully built static output in dist/");
