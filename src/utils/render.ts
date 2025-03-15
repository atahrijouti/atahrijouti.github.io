export const $loop = <T>(items: T[], fn: (item: T) => string): string => items.map(fn).join("")
