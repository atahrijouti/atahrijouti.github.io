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

export const assemblePage = async (pageName: string) => {
  const timestamp = Date.now();
  const { metadata, content } = await import(
    `../src/app/${pageName}/index.js?cache-bust=${timestamp}`
  );

  console.log(content);

  const html = await Bun.file("./src/layout.html").text();

  return html
    .replace("{{title}}", metadata.title)
    .replace(
      "<!-- {{scripts}} -->",
      `<script type="module" src="/app/${pageName}/index.js"></script>
      ${HMR_STRING}
      `,
    )
    .replace("<!-- {{content}} -->", content());
};
