export const hasKeysOf = (object: Record<string, unknown>, set: Set<string>) => {
  const keys = Object.keys(object)
  for (const key of keys) {
    if (set.has(key)) {
      return true
    }
  }
  return false
}
