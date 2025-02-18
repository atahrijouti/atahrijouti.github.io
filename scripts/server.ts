import { readdirSync, watch } from "fs"

import { $, type ServerWebSocket } from "bun"
import { assemblePage } from "./assemble-page"
import { listTypeScriptFiles, transpileAndWriteFiles } from "./transpile"
import { clearImportCache, debounce } from "./utils"

const SRC_FOLDER = "./src"
const DIST_FOLDER = "./dist"

const sockets = new Set<ServerWebSocket<unknown>>()

const remakeDist = async () => {
  await $`rm -rf ${DIST_FOLDER}`
  await $`mkdir ${DIST_FOLDER}`
}

const reloadPageMessage = (ws: ServerWebSocket<unknown>) => {
  // console.log(`WebSocket :\tChange detected, reload the browser`)
  ws.send("reload")
}

const reloadDevEnvironment = debounce(() => {
  clearImportCache()
  sockets.forEach((ws) => {
    reloadPageMessage(ws)
  })
}, 750)

await remakeDist()

try {
  await transpileAndWriteFiles(listTypeScriptFiles(SRC_FOLDER))
} catch (err) {
  console.error("Error during transpilation:", err)
}

const watcher = watch("./src", { recursive: true, persistent: true })
watcher.on("change", async (event, filename) => {
  // console.log(`File Watcher :\tevent [${event}], file[${SRC_FOLDER}/${filename}]`)
  if (filename.toString().endsWith(".ts")) {
    await transpileAndWriteFiles([`${SRC_FOLDER}/${filename}`])
  }
  reloadDevEnvironment()
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
      console.log(`Route :\t ${pageName} - ${Date.now()}`)
      const page = await assemblePage(pageName)
      return new Response(page.html, {
        headers: { "Content-Type": "text/html" },
        status: page.status,
      })
    }

    if (url.pathname === "/favicon.ico") {
      return new Response(" ")
    }

    return new Response(Bun.file("./dist" + url.pathname))
  },
  websocket: {
    open(ws) {
      sockets.add(ws)
    },
    async message() { },
    close: (ws) => {
      sockets.delete(ws)
    },
  },
})

console.log(`Bun server running on http://localhost:${server.port}`)
