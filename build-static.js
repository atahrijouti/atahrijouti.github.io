import { JSDOM } from "jsdom"
import { reactive, html } from "@arrow-js/core"

const jsdom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`)

global.window = jsdom.window

const domGlobals = [
  "document",
  "Element",
  "Node",
  "Text",
  "DocumentFragment",
  "HTMLOptionElement",
  "HTMLInputElement",
  "HTMLSelectElement",
  "HTMLTextAreaElement",
]
for (const globalName of domGlobals) {
  global[globalName] = window[globalName]
}

const wrapper = document.createElement("div")

const data = reactive({
  message: "Word",
})

const fragment = html`<p>Hello ${() => data.message}</p>`

const waitThenLog = (el) => {
  setTimeout(() => {
    console.log(el.innerHTML)
  })
}

fragment(wrapper)

console.log(wrapper.innerHTML)

setTimeout(() => {
  data.message = "JSDOM"

  waitThenLog(wrapper)

  setTimeout(() => {
    data.message = "ChatGPT"

    waitThenLog(wrapper)

    console.log(document.body.innerHTML)
  }, 300)
}, 300)
