import { readdirSync, watch } from "fs"
import { watch as w } from "fs/promises"

import { type ServerWebSocket } from "bun"
import { assemblePage } from "./assemble-page"

const reloadPageMessage = (event: string, ws: ServerWebSocket<unknown>) => {
  console.log(`Server Dist Watcher : Change detected, send WS reload message`)
  ws.send("reload")
}

const sockets = new Set<ServerWebSocket<unknown>>()

const watchDistBlock = async () => {
  const watcher = w("./dist", { recursive: true, persistent: true })
  console.log("created server watcher")

  for await (const event of watcher) {
    console.log(`Server : File Watcher - ${event.filename}`)
  }
}

const watchDist = async () => {
  const watcher = watch("./dist", { recursive: true, persistent: true })
  console.log("created server watcher")

  watcher.on("change", (event, filename) => {
    console.log(`Server : File Watcher - ${filename}`)
    sockets.forEach((ws) => {
      reloadPageMessage(event, ws)
    })
  })
}

watchDist()

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
        console.log(pageName)
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
