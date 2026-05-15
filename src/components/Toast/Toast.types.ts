export type ToastType = 'default' | 'success' | 'error' | 'warning' | 'info'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface ToastItem {
  id: string
  message: string
  type: ToastType
  duration: number
  title?: string
}

export interface ToastOptions {
  duration?: number
  title?: string
}

export interface ToastContextValue {
  toasts: ToastItem[]
  add: (item: Omit<ToastItem, 'id'>) => string
  remove: (id: string) => void
}

export interface ToasterProps {
  position?: ToastPosition
  maxToasts?: number
}
