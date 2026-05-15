import { useEffect } from 'react'

type KeyHandlers = Partial<Record<string, (e: KeyboardEvent) => void>>

export function useKeydown(handlers: KeyHandlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const onKeyDown = (e: KeyboardEvent) => {
      const handler = handlers[e.key]
      handler?.(e)
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [handlers, enabled])
}
