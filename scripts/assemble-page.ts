import path from "path"

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

export const assemblePage = async (pageName: string) => {
  const layoutPath = path.resolve("./src/layout.html")
  const modulePath = path.resolve(`./src/app/${pageName}/index.ts`)

  let content = () => "things arent working..."
  let metadata = {
    title: `${pageName} - 500`,
  }

  if (!(await Bun.file(modulePath).exists())) {
    console.error("ts file dont exist")
    return {
      status: 500,
      html: `<title>${pageName} - 500</title><p>Can't access module : ${modulePath}</p>${HMR_STRING}`,
    }
  }

  if (!(await Bun.file(layoutPath).exists())) {
    console.error("layout file dont exist")
    return {
      status: 500,
      html: `<title>${pageName} - 500</title><p>Can't access layout : ${layoutPath}</p>${HMR_STRING}`,
    }
  }

  try {
    ; ({ metadata, content } = await import(modulePath))

    if (metadata == null || content == null) {
      throw new Error("metadata or content unavailable")
    }
  } catch (err) {
    console.error(`mal-constructed ${modulePath}`, err)
    return {
      status: 400,
      html: `<title>${pageName} - 400</title><p>missing module essentials - ${modulePath}</p><p>${err}</p>${HMR_STRING}`,
    }
  }

  // console.log(`AssemblePage :\tcontent [${content()}]`)

  const responseHtml = await Bun.file(layoutPath).text()

  return {
    status: 200,
    html: responseHtml
      .replace("{{title}}", metadata.title)
      .replace(
        "<!-- {{scripts}} -->",
        `<script type="module" src="/app/${pageName}/index.js"></script>
      ${HMR_STRING}
      `,
      )
      .replace("<!-- {{content}} -->", content()),
  }
}
