import path from "path"
import prettier from "prettier"
import type { Metadata, Module } from "../src/types"
import { html } from "../src/utils/tags"
import { defaultMetadata } from "../src/main.metadata"

const HMR_STRING = `<script>
  let ws = new WebSocket("ws://localhost:3000");
  ws.onmessage = function (event) {
      if (event.data === "reload") {
          console.log("File change detected, reloading page...");
          window.location.reload();
      }
  };
  ws.onerror = function (error) {
      console.error("WebSocket error:", error);
  };
  ws.onclose = function () {
      console.log("WebSocket connection closed");
      setTimeout(()=>{ window.location.reload(); }, 1000)
  };
  </script>`

const assembleMetadata = (metadata: Metadata) => {
  const metaTags: string[] = []
  for (const [key, value] of Object.entries(metadata)) {
    if (!value) continue

    switch (key) {
      case "theme-color":
      case "color-scheme":
      case "description":
        // prettier-ignore
        metaTags.push(html`<meta name="${key}" content="${value.replaceAll('"', "&quot;").replaceAll("'", "&#39;")}" />`)
        break
      case "manifest":
        metaTags.push(html`<link rel="manifest" href="${value}" />`)
        break
      case "icon":
        metaTags.push(html`<link rel="icon" href="${value}" type="image/png" />`)
        break
    }
  }

  return metaTags.join("\n")
}

export const assemblePage = async (pageName: string): Promise<{ status: number; html: string }> => {
  const layoutPath = path.resolve("./src/main.layout.html")
  const modulePath = path.resolve(`./src/app/${pageName}/index.ts`)

  let content = () => "things arent working..."
  let metadata = { ...defaultMetadata }
  if (!(await Bun.file(modulePath).exists())) {
    console.error(`Can't access module: ${modulePath}`)
    return {
      status: 500,
      html: `<title>${pageName} - 500</title><p>Can't access module: ${modulePath}</p>${HMR_STRING}`,
    }
  }

  if (!(await Bun.file(layoutPath).exists())) {
    console.error(`Can't access layout: ${layoutPath}`)
    return {
      status: 500,
      html: `<title>${pageName} - 500</title><p>Can't access layout: ${layoutPath}</p>${HMR_STRING}`,
    }
  }

  try {
    const module: Module = await import(modulePath)

    if (module.metadata == null || module.content == null) {
      throw new Error("metadata or content unavailable")
    }

    content = module.content
    metadata = { ...metadata, ...module.metadata }
  } catch (err) {
    console.error(`Missing module essentials - ${modulePath}`, err)
    return {
      status: 400,
      html: `<title>${pageName} - 400</title><p>Missing module essentials - ${modulePath}</p><p>${err}</p>${HMR_STRING}`,
    }
  }

  const responseHtml = await Bun.file(layoutPath).text()

  let assembledHtml = responseHtml.replace("{{title}}", metadata.title)

  let scriptsHtml = html`<script type="module">
    import * as pageModule from "/app/${pageName}/index.js"
    if (typeof pageModule.ready === "function") {
      document.addEventListener("DOMContentLoaded", pageModule.ready)
    }
  </script>`

  if (process.env.NODE_ENV === "development") {
    scriptsHtml = scriptsHtml.concat(HMR_STRING)
  }

  assembledHtml = assembledHtml.replace("<!-- {{scripts}} -->", scriptsHtml)

  if (await Bun.file(path.resolve(`./src/app/${pageName}/styles.css`)).exists()) {
    assembledHtml = assembledHtml.replace(
      "<!-- {{styles}} -->",
      `<link rel="stylesheet" href="/app/${pageName}/styles.css" />`,
    )
  }

  assembledHtml = assembledHtml.replace("<!-- {{metadata}} -->", assembleMetadata(metadata))
  assembledHtml = assembledHtml.replace("<!-- {{content}} -->", content())

  if (process.env.NODE_ENV === "development") {
    assembledHtml = assembledHtml.replace(
      /<!-- {{build-only:start}} -->[\s\S]*?<!-- {{build-only:end}} -->/g,
      "",
    )
  }

  if (process.env.NODE_ENV != "development") {
    const HTML_COMMENT_REGEX = /<!--\s*{{[^}]+}}\s*-->/g
    assembledHtml = assembledHtml.replace(HTML_COMMENT_REGEX, "")
  }

  return {
    status: 200,
    html: await prettier.format(assembledHtml, { parser: "html" }),
  }
}
