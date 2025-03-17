import path from "path"

const CWD = path.dirname(Bun.main)
const MAIN_DIR = path.join(CWD, "..")
const SRC_PATH = path.join(MAIN_DIR, "src")

export const debounce = <T extends (...args: unknown[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => func(...args), delay)
  }
}

const checkSkipImport = (filePath: string) => {
  if (!filePath.startsWith(SRC_PATH)) {
    return true
  }

  return false
}

export const clearImportCache = () => {
  for (const file of Object.keys(require.cache)) {
    if (checkSkipImport(file)) continue
    delete require.cache[file]
  }
}
