import { html, textToHTML } from "unbundle"

type Commands = Record<string, () => void>

function catboxUrl(fileName: string) {
  return `https://files.catbox.moe/${fileName}`
}

function redirectTo(url: string) {
  return () => {
    window.location.href = url
  }
}

const commands: Commands = {
  mino1: redirectTo(catboxUrl("srihjp.jpg")),
  mino2: redirectTo(catboxUrl("att5et.jpg")),
}

const TAPS_TO_OPEN = 5
const TAP_GAP_MS = 300

function listenForTaps(target: HTMLElement, taps: number, onTaps: () => void) {
  let count = 0
  let timer: number | undefined

  target.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a, button")) return
    count += 1
    clearTimeout(timer)
    timer = window.setTimeout(() => {
      if (count >= taps) onTaps()
      count = 0
    }, TAP_GAP_MS)
  })
}

function listenForCommands(input: HTMLInputElement, commands: Commands) {
  input.addEventListener("input", () => {
    const name = input.value.trim().toLowerCase()
    if (Object.hasOwn(commands, name)) commands[name]?.()
  })
}

const CommandInput = () =>
  html`<input
    class="command-input"
    type="text"
    aria-label="Command"
    autocomplete="off"
    autocapitalize="off"
    autocorrect="off"
    spellcheck="false"
    enterkeyhint="go" />`

function openCommandPalette() {
  if (document.querySelector(".command-input")) return
  const input = textToHTML(CommandInput()) as HTMLInputElement

  listenForCommands(input, commands)

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") input.blur()
  })

  input.addEventListener("blur", () => input.remove())

  document.body.append(input)
  input.focus()
}

export function setupCommandPalette() {
  document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.key === ",") {
      event.preventDefault()
      openCommandPalette()
    }
  })

  const sidebar = document.querySelector<HTMLElement>(".sidebar")
  if (sidebar) listenForTaps(sidebar, TAPS_TO_OPEN, openCommandPalette)
}
