export const loop = (
  fn: (next: (delayMs?: number) => void, stop: () => void, i: number) => void,
): (() => void) => {
  let currentTimeout: NodeJS.Timeout = null
  let stopped = false
  const stop = () => {
    stopped = true
    if (currentTimeout != null)
      clearTimeout(currentTimeout)
  }
  const next = (i: number) => fn(delayMs => {
    if (!stopped) {
      if (delayMs == null)
        next(i + 1)
      else
        currentTimeout = setTimeout(() => next(i + 1), delayMs)
    }
  }, stop, i)
  next(0)
  return stop
}

// eslint-disable-next-line no-promise-executor-return
export const wait = (s: number) => new Promise(r => setTimeout(r, s * 1000))
