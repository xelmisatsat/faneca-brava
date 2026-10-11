import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import chatRouter from "../routes/chat";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

import { wafMiddleware } from "./waf";

// Global process safety handlers to prevent server crashes on Render
process.on("unhandledRejection", (reason) => {
  console.error("[Server Security] Unhandled Rejection caught:", reason);
});
process.on("uncaughtException", (error) => {
  console.error("[Server Security] Uncaught Exception caught:", error);
});

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Trust Render reverse proxy for accurate client IP identification (rate limiting)
  app.set("trust proxy", 1);

  // Hide server identity to mitigate automated scanner fingerprinting
  app.disable("x-powered-by");

  // Strict request body limit to protect memory from DoS/exhaustion attacks
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ limit: "1mb", extended: true }));

  // Advanced WAF Security Shield: blocks scanners, probes, XSS, prototype pollution, DoS
  app.use(wafMiddleware);

  registerStorageProxy(app);
  registerOAuthRoutes(app);
  // Chat IA route
  app.use(chatRouter);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
