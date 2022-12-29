function enomji(number) {
  const demogits = {
    0: "0️⃣",
    1: "1️⃣",
    2: "2️⃣",
    3: "3️⃣",
    4: "4️⃣",
    5: "5️⃣",
    6: "6️⃣",
    7: "7️⃣",
    8: "8️⃣",
    9: "9️⃣"
  }

  return number
    .toString()
    .split("")
    .map(digit => demogits[digit])
    .join("")
}

function showNearBy({ galaxy, system, range = 20 }) {
  var table = document.getElementById("ranks")
  var rows = Array.from(table.querySelectorAll("tbody tr"))

  rows.forEach(row => {
    const link = row.querySelector(".name > a")
    const textArea = link.querySelector(".playername")
    const playerName = textArea.innerText
    const url = link.href
    const params = url.split("index.php?page=galaxy&")[1]

    let [userGalaxy, userSystem, planet] = params
      .split("&")
      .map(x => x.split("=")[1])

    userGalaxy = Number(userGalaxy)
    userSystem = Number(userSystem)

    let sameSystem = userGalaxy === galaxy
    let closeby = userSystem >= system - range && userSystem <= system + range

    if (sameSystem && closeby) {
      textArea.innerText = `${playerName} [${enomji(userGalaxy)}:${enomji(
        userSystem
      )}:${enomji(planet)}]`
    }
  })
}
