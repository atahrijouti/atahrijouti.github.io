let theme = matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day"
try {
  const stored = localStorage.getItem("theme")
  if (stored === "day" || stored === "night") theme = stored
} catch {
  // Storage blocked: follow the system.
}
document.documentElement.dataset.theme = theme
