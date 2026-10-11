import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(`[Static] Could not find the build directory: ${distPath}`);
  }

  // Serve static files safely: ignore dotfiles (.env, .git, etc.)
  app.use(
    express.static(distPath, {
      dotfiles: "ignore",
      index: ["index.html"],
      etag: true,
      maxAge: "1d",
    })
  );

  // Fall through: only serve index.html for frontend navigation, return 404 JSON for missing API routes
  app.use("*", (req, res) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/manus-storage")) {
      res.status(404).json({ error: "Recurso ou endpoint non atopado" });
      return;
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
