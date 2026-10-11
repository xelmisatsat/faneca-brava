import "dotenv/config";
import express from "express";
import { createServer } from "http";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import chatRouter from "../routes/chat";
import { wafMiddleware } from "./waf";
import { serveStatic } from "./static";

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

  // Development mode loads Vite dynamically; production uses isolated static server
  if (process.env.NODE_ENV === "development") {
    const devViteModule = "./vite";
    const { setupVite } = await import(/* @vite-ignore */ devViteModule);
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Cloud & Render compatibility: bind to 0.0.0.0 on the exact port provided by environment
  const port = parseInt(process.env.PORT || "3000", 10);
  const host = "0.0.0.0";

  server.listen(port, host, () => {
    console.log(`[Faneca Brava] Server running on http://${host}:${port}/`);
  });
}

startServer().catch(console.error);
