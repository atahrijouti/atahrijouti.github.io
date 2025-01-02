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
  const { metadata, content } = await import(`../src/app/${pageName}/index.js`);
  const layout = await loadFile("./src/layout.html");

  return layout
    .replace("{{title}}", metadata.title)
    .replace("<!-- {{content}} -->", content());

  return "hello world";
};
