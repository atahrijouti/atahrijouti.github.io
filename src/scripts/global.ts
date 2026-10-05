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

function listenForCommands(commands: Commands) {
  const maxLength = Math.max(...Object.keys(commands).map((name) => name.length))
  let typed = ""

  document.addEventListener("keydown", (event) => {
    if (event.key.length !== 1) return
    typed = (typed + event.key.toLowerCase()).slice(-maxLength)

    const match = Object.keys(commands).find((name) => typed.endsWith(name))
    if (match) {
      typed = ""
      commands[match]?.()
    }
  })
}

function main() {
  listenForCommands(commands)
}

main()
