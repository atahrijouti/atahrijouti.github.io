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
  </script>`;

const loadFile = async (filePath: string) => {
  try {
    const fileContent = await Bun.file(filePath).text(); // Efficient file reading with Bun
    return fileContent;
  } catch (err) {
    console.error(`Error loading file: ${filePath}`, err);
    return "";
  }
};

export const assemblePage = async (pageName: string) => {
  const timestamp = Date.now();
  const { metadata, content } = await import(
    `../src/app/${pageName}/index.js?cache-bust=${timestamp}`
  );

  const distHtmlName = pageName === "home" ? "index" : pageName;

  const builtHtml = await Bun.build({
    entrypoints: [`${distHtmlName}.html`],
    outdir: "./dist",
    minify: false,
    html: true,
    experimentalCss: true,
    plugins: [
      {
        name: "inject-metadata",
        setup({ onLoad }) {
          onLoad({ filter: /\.html$/ }, async (args) => {
            const html = await Bun.file("./src/layout.html").text();

            return {
              contents: html
                .replace("{{title}}", metadata.title)
                .replace(
                  "<!-- {{scripts}} -->",
                  `<script type="module" src="/src/app/${pageName}/index.js"></script>
                  ${HMR_STRING}`,
                )
                .replace("<!-- {{content}} -->", content()),
              loader: "html",
            };
          });
        },
      },
    ],
  });

  return Bun.file(`./dist/${distHtmlName}.html`);
};
