import React from 'react'

type AnyProps = Record<string, unknown>

function mergeRefs<T>(refs: React.Ref<T>[]): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref !== null && ref !== undefined) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...childProps }

  for (const key in slotProps) {
    const slotVal = slotProps[key]
    const childVal = childProps[key]

    if (key === 'className') {
      merged[key] = [slotVal, childVal].filter(Boolean).join(' ')
    } else if (key === 'style') {
      merged[key] = { ...(slotVal as object), ...(childVal as object) }
    } else if (
      key.startsWith('on') &&
      typeof slotVal === 'function' &&
      typeof childVal === 'function'
    ) {
      merged[key] = (...args: unknown[]) => {
        ;(childVal as (...a: unknown[]) => unknown)(...args)
        ;(slotVal as (...a: unknown[]) => unknown)(...args)
      }
    } else {
      merged[key] = slotVal !== undefined ? slotVal : childVal
    }
  }

  return merged
}

export interface SlotProps {
  children?: React.ReactNode
  [key: string]: unknown
}

export const Slot = React.forwardRef<HTMLElement, SlotProps>(
  ({ children, ...slotProps }, ref) => {
    if (!React.isValidElement(children)) {
      return null
    }

    const childProps = children.props as AnyProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const childRef: React.Ref<unknown> | undefined = (children as any).ref

    const refs: React.Ref<unknown>[] = [ref, childRef].filter(Boolean) as React.Ref<unknown>[]
    const mergedRef = refs.length > 1 ? mergeRefs(refs) : (refs[0] ?? null)

    return React.cloneElement(children, {
      ...mergeProps(slotProps, childProps),
      ref: mergedRef,
    } as AnyProps)
  },
)

Slot.displayName = 'Slot'
