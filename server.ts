import { watch, readdirSync } from "fs"
import { type ServerWebSocket } from "bun"
import { assemblePage } from "./utils/assemble-page"

const reloadPageMessage = (event: string, ws: ServerWebSocket<unknown>) => {
  console.log(`Change detected ${event}`)
  ws.send("reload")
}

const sockets = new Set<ServerWebSocket<unknown>>()

const watcher = watch("./dist", { recursive: true })
watcher.on("change", (event) => {
  console.log(`Change detected, issuing reload to ${sockets.size} clients`)
  sockets.forEach((ws) => {
    reloadPageMessage(event, ws)
  })
})

const server = Bun.serve({
  port: 3000,
  fetch: async (req, server) => {
    if (server.upgrade(req)) {
      return undefined
    }

    const url = new URL(req.url)

    const pageName = url.pathname === "/" ? "home" : url.pathname.slice(1)

    const pages = new Set(readdirSync("./src/app"))

    if (pages.has(pageName)) {
      try {
        const html = await assemblePage(pageName)
        return new Response(html, {
          headers: { "Content-Type": "text/html" },
        })
      } catch (err) {
        console.error(err)
        return new Response(
          "<h1>500 - the page folder doesn't contain an index most probably</h1>",
          { status: 500 },
        )
      }
    }

    if (url.pathname === "/public/favicon.ico") {
      return new Response(" ")
    }

    return new Response(Bun.file("./dist" + url.pathname))
  },
  websocket: {
    open(ws) {
      sockets.add(ws)
    },
    async message() {},
    close: (ws) => {
      sockets.delete(ws)
    },
  },
})

console.log(`Bun server running on http://localhost:${server.port}`)
