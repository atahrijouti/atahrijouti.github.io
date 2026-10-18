type Theme = "day" | "night"

const THEME_KEY = "theme"
const systemNight = window.matchMedia("(prefers-color-scheme: dark)")

function systemTheme(): Theme {
  return systemNight.matches ? "night" : "day"
}

function storedTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === "day" || stored === "night" ? stored : null
  } catch {
    return null
  }
}

// Picking what the system already shows drops the override: back to auto.
function rememberTheme(theme: Theme) {
  try {
    if (theme === systemTheme()) localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, theme)
  } catch {
    // Storage blocked: the choice lasts for this page only.
  }
}

export function setupThemeToggle() {
  const root = document.documentElement
  const toggle = document.querySelector<HTMLButtonElement>(".theme-toggle")

  const apply = (theme: Theme) => {
    root.dataset.theme = theme
    toggle?.setAttribute("aria-pressed", String(theme === "night"))
  }

  apply(storedTheme() ?? systemTheme())

  systemNight.addEventListener("change", () => {
    if (!storedTheme()) apply(systemTheme())
  })

  toggle?.addEventListener("click", () => {
    const next: Theme = root.dataset.theme === "night" ? "day" : "night"
    rememberTheme(next)
    apply(next)
  })
}
