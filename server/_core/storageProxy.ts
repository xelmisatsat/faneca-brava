import fs from "node:fs";
import path from "node:path";
import type { Express } from "express";
import { ENV } from "./env";

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const rawKey = (req.params as Record<string, string>)[0];
    if (!rawKey) {
      res.status(400).send("Missing storage key");
      return;
    }

    // Security check: strictly block path traversal attempts (.., null bytes, backslashes, drive letters)
    const decodedKey = decodeURIComponent(rawKey);
    if (decodedKey.includes("..") || decodedKey.includes("\0") || decodedKey.includes("\\") || decodedKey.includes(":")) {
      res.status(403).send("Forbidden: Invalid storage path");
      return;
    }

    // Sanitize key to remove any leading slashes or dangerous characters
    const cleanKey = decodedKey.replace(/^\/+/, "");

    // Allowed local base directories
    const allowedBaseDirs = [
      path.resolve(process.cwd(), "client", "public", "manus-storage"),
      path.resolve(process.cwd(), "dist", "public", "manus-storage"),
    ];

    for (const baseDir of allowedBaseDirs) {
      if (!fs.existsSync(baseDir)) continue;

      const resolvedPath = path.resolve(baseDir, cleanKey);

      // Verify that resolvedPath is strictly inside baseDir
      if (resolvedPath.startsWith(baseDir + path.sep)) {
        try {
          if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
            res.sendFile(resolvedPath);
            return;
          }
        } catch {
          // If stat fails, continue
        }
      }
    }

    if (!ENV.forgeApiUrl || !ENV.forgeApiKey) {
      res.status(404).send("File not found locally and proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL(
        "v1/storage/presign/get",
        ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
      );
      forgeUrl.searchParams.set("path", cleanKey);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
      });

      if (!forgeResp.ok) {
        const body = await forgeResp.text().catch(() => "");
        console.error(`[StorageProxy] forge error: ${forgeResp.status} ${body}`);
        res.status(502).send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url: string };
      if (!url) {
        res.status(502).send("Empty signed URL from backend");
        return;
      }

      res.set("Cache-Control", "no-store");
      res.redirect(307, url);
    } catch (err) {
      console.error("[StorageProxy] failed:", err);
      res.status(502).send("Storage proxy error");
    }
  });
}

