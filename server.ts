import { assemblePage } from "./utils/assemble-page";
import { watch } from "fs";
import type { ServerWebSocket } from "bun";

const watcher = watch("./src");
const reloadPageMessage = (event: string, ws: ServerWebSocket<unknown>) => {
  console.log(`Change detected ${event}`);
  ws.send("reload");
};

const server = Bun.serve({
  port: 3000,
  fetch: async (req, server) => {
    if (server.upgrade(req)) {
      return undefined;
    }

    const url = new URL(req.url);

    // Serve assets from the /app route
    if (url.pathname.startsWith("/app")) {
      return new Response(Bun.file("./src" + url.pathname));
    }

    const pageName = url.pathname === "/" ? "home" : url.pathname.slice(1);

    try {
      const html = await assemblePage(pageName);
      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      });
    } catch (err) {
      console.error(err);
      return new Response("<h1>404 - Page Not Found</h1>", { status: 404 });
    }
  },
  websocket: {
    open(ws) {
      // watcher.on("change", (event) => {
      // reloadPageMessage(event, ws);
      // });
      console.log(ws);
    },
    async message(ws) {},
    close(ws, code, reason) {
      console.log("closing watcher", ws);
    },
  },
});

console.log(`Bun server running on http://localhost:${server.port}`);
