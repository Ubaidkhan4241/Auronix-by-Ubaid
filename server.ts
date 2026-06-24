import express from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Use JSON middleware with generous limit as users can upload base64 images for prototypes!
  app.use(express.json({ limit: "50mb" }));

  // API endpoint to save customer dynamic portfolio modifications permanently to the code files
  app.post("/api/save-portfolio", (req, res) => {
    try {
      const items = req.body;
      if (!Array.isArray(items)) {
        return res.status(400).json({ error: "Portfolio data must be a valid JSON Array" });
      }

      const filePath = path.join(process.cwd(), "src", "data-custom.json");
      fs.writeFileSync(filePath, JSON.stringify(items, null, 2), "utf8");
      
      console.log(`[AURONIX SYNC] Portfolio synchronized to disk successfully! Saved ${items.length} items.`);
      return res.json({ success: true, count: items.length });
    } catch (err: any) {
      console.error("[AURONIX ERROR] Failed to save portfolio:", err);
      return res.status(500).json({ error: err.message || "Failed to persist files" });
    }
  });

  // Simple health probe
  app.get("/api/health", (req, res) => {
    res.json({ status: "healthy", timestamp: new Date().toISOString() });
  });

  // Integrate Vite server in development mode, serve static build in production
  if (process.env.NODE_ENV !== "production") {
    console.log("[AURONIX SERVER] Integrating Vite Dev Middleware on port", PORT);
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("[AURONIX SERVER] Running in Production Mode. Serving static assets.");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AURONIX SERVER] Microservice online at http://0.0.0.0:${PORT}`);
  });
}

startServer();
