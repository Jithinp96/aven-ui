import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import type { ToasterProps, ToastItem as ToastItemType } from './Toast.types'
import { useToastContext } from './ToastProvider'

const ICONS = {
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  default: null,
} as const

interface ToastItemProps {
  toast: ToastItemType
  onRemove: () => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const remainingRef = useRef(toast.duration)
  const startTimeRef = useRef(0)

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  const startTimer = useCallback(() => {
    if (remainingRef.current <= 0) return
    startTimeRef.current = Date.now()
    timerRef.current = setTimeout(onRemove, remainingRef.current)
  }, [onRemove])

  const pauseTimer = useCallback(() => {
    if (!timerRef.current) return
    clearTimer()
    remainingRef.current = Math.max(0, remainingRef.current - (Date.now() - startTimeRef.current))
  }, [clearTimer])

  useEffect(() => {
    startTimer()
    return clearTimer
  }, [startTimer, clearTimer])

  const IconComponent = ICONS[toast.type]

  return (
    <div
      className={cn('aven-toast', `aven-toast--${toast.type}`)}
      role={toast.type === 'error' ? 'alert' : 'status'}
      aria-atomic="true"
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
    >
      {IconComponent && (
        <span className="aven-toast-icon" aria-hidden="true">
          <IconComponent size={18} />
        </span>
      )}
      <div className="aven-toast-body">
        {toast.title && <p className="aven-toast-title">{toast.title}</p>}
        <p className="aven-toast-message">{toast.message}</p>
      </div>
      <button
        type="button"
        className="aven-toast-close"
        aria-label="Close"
        onClick={onRemove}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  )
}

export function Toaster({ position = 'bottom-right', maxToasts = 5 }: ToasterProps) {
  const { toasts, remove } = useToastContext()
  const visible = toasts.slice(-maxToasts)

  if (typeof document === 'undefined') return null

  return createPortal(
    <div
      className={cn('aven-toaster', `aven-toaster--${position}`)}
      aria-label="Notifications"
    >
      {visible.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={() => remove(toast.id)} />
      ))}
    </div>,
    document.body,
  )
}
