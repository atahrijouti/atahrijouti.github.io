import { watch } from "fs";
import { type ServerWebSocket } from "bun";

const reloadPageMessage = (event: string, ws: ServerWebSocket<unknown>) => {
  console.log(`Change detected ${event}`);
  ws.send("reload");
};

const sockets = new Set<ServerWebSocket<unknown>>();

const watcher = watch("./dist", { recursive: true });
watcher.on("change", (event) => {
  console.log(`Change detected, issuing reload to ${sockets.size} clients`);
  sockets.forEach((ws) => {
    reloadPageMessage(event, ws);
  });
});

const server = Bun.serve({
  port: 3000,
  fetch: async (req, server) => {
    if (server.upgrade(req)) {
      return undefined;
    }

    const url = new URL(req.url);

    return new Response(Bun.file("./dist" + url.pathname));
  },
  websocket: {
    open(ws) {
      sockets.add(ws);
    },
    async message(ws) {},
    close: (ws) => {
      sockets.delete(ws);
    },
  },
});

console.log(`Bun server running on http://localhost:${server.port}`);
