// Helper to load a file using Bun.file
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
  const layout = await loadFile("./src/layout.html");

  return layout
    .replace("{{title}}", metadata.title)
    .replace(
      "<!-- {{scripts}} -->",
      `
      <script type="module" src="/app/${pageName}/index.js"></script>
      <script>
          const ws = new WebSocket("ws://localhost:3000");
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
          };
      </script>`,
    )
    .replace("<!-- {{content}} -->", content());
};
