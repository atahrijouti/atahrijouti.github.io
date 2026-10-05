function listenForMino() {
  const secret = "mino"
  let typed = ""

  document.addEventListener("keydown", (event) => {
    if (event.key.length !== 1) return
    typed = (typed + event.key.toLowerCase()).slice(-secret.length)
    if (typed === secret) {
      console.log("hi from global")
      typed = ""
    }
  })
}

function main() {
  listenForMino()
}

main()
