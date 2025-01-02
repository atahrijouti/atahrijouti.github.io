import { assemblePage } from "./utils/assemble-page";

// Serve dynamically assembled pages
const server = Bun.serve({
  port: 3000,
  fetch: async (req) => {
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
});

console.log(`Bun server running on http://localhost:${server.port}`);
