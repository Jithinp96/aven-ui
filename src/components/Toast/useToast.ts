import type { ToastContextValue, ToastOptions, ToastType } from './Toast.types'
import { useToastContext } from './ToastProvider'

const DEFAULT_DURATION = 4000

function makeAdder(
  add: ToastContextValue['add'],
  type: ToastType,
  defaultDuration: number,
) {
  return (message: string, options?: ToastOptions) =>
    add({
      message,
      type,
      duration: options?.duration ?? defaultDuration,
      ...(options?.title !== undefined && { title: options.title }),
    })
}

export function useToast() {
  const { add, remove } = useToastContext()

  return {
    toast: {
      success: makeAdder(add, 'success', DEFAULT_DURATION),
      error: makeAdder(add, 'error', 0),
      warning: makeAdder(add, 'warning', DEFAULT_DURATION),
      info: makeAdder(add, 'info', DEFAULT_DURATION),
      show: makeAdder(add, 'default', DEFAULT_DURATION),
      dismiss: remove,
    },
  }
}
