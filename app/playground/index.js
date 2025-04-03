import { html } from "unbundle";
const metadata = {
  title: "Playground",
  description: "A sandbox to play with the toys I have made, this is my playground and yours"
};
const content = () => {
  return html`<div>
    <h1>Playground</h1>
    <p>This is a place where I showcase all my playthings</p>
  </div>`;
};
export {
  content,
  metadata
};
