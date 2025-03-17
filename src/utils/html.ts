export const textToHTML = (htmlString: string): HTMLElement => {
  const div = document.createElement("div")
  div.innerHTML = htmlString
  const firstChild = div.firstElementChild as HTMLElement

  if (!firstChild) {
    console.error("No valid HTML element found in", htmlString)
    return document.createElement("div")
  }

  return firstChild
}
