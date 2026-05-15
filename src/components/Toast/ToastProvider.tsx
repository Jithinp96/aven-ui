import React, { createContext, useCallback, useContext, useState } from 'react'
import type { ToastContextValue, ToastItem } from './Toast.types'

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const add = useCallback((item: Omit<ToastItem, 'id'>): string => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((prev) => [...prev, { ...item, id }])
    return id
  }, [])

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, add, remove }}>
      {children}
    </ToastContext.Provider>
  )
}
