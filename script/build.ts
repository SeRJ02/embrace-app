import { build as esbuild } from "esbuild";
import { build as viteBuild } from "vite";
import { rm, readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const clientDir = path.join(rootDir, "client");
const distDir = path.join(rootDir, "dist/public");

console.log("rootDir:", rootDir);
console.log("clientDir:", clientDir);
console.log("index.html exists at clientDir:", existsSync(path.join(clientDir, "index.html")));
console.log("index.html exists at rootDir:", existsSync(path.join(rootDir, "index.html")));

const allowlist = [
  "connect-pg-simple", "cors", "date-fns", "drizzle-orm", "drizzle-zod",
  "express", "express-session", "memorystore", "nanoid", "passport",
  "passport-local", "pg", "ws", "zod", "zod-validation-error",
];

async function buildAll() {
  await rm(path.join(rootDir, "dist"), { recursive: true, force: true });

  console.log("building client...");
  await viteBuild({
    root: clientDir,
    resolve: {
      alias: {
        "@": path.join(clientDir, "src"),
        "@shared": path.join(rootDir, "shared"),
        "@assets": path.join(rootDir, "attached_assets"),
      },
    },
    plugins: [(await import("@vitejs/plugin-react")).default()],
    build: {
      outDir: distDir,
      emptyOutDir: true,
      rollupOptions: {
        input: path.join(clientDir, "index.html"),
      },
    },
  });

  console.log("building server...");
  const pkg = JSON.parse(await readFile(path.join(rootDir, "package.json"), "utf-8"));
  const allDeps = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.devDependencies || {})];
  const externals = allDeps.filter((dep) => !allowlist.includes(dep));

  await esbuild({
    entryPoints: [path.join(rootDir, "server/index.ts")],
    platform: "node",
    bundle: true,
    format: "cjs",
    outfile: path.join(rootDir, "dist/index.cjs"),
    define: { "process.env.NODE_ENV": '"production"' },
    minify: true,
    external: externals,
    logLevel: "info",
  });
}

buildAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
