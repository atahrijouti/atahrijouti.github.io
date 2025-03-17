const textToHTML = (htmlString) => {
  const div = document.createElement("div");
  div.innerHTML = htmlString;
  const firstChild = div.firstElementChild;
  if (!firstChild) {
    console.error("No valid HTML element found in", htmlString);
    return document.createElement("div");
  }
  return firstChild;
};
export {
  textToHTML
};
