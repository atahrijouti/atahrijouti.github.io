export const makeMap = <T>(object: Record<string, T>) => {
  return new Map(Object.entries(object))
}
