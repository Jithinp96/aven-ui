import { useCallback, useRef, useState } from 'react'

interface UseControllableOptions<T> {
  value?: T
  defaultValue?: T
  onChange?: (value: T) => void
}

export function useControllable<T>({
  value,
  defaultValue,
  onChange,
}: UseControllableOptions<T>): [T | undefined, (next: T) => void] {
  const isControlled = value !== undefined
  const isControlledRef = useRef(isControlled)
  const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue)

  const currentValue = isControlledRef.current ? value : internalValue

  const setValue = useCallback(
    (next: T) => {
      if (!isControlledRef.current) {
        setInternalValue(next)
      }
      onChange?.(next)
    },
    [onChange],
  )

  return [currentValue, setValue]
}
