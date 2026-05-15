import React, { createContext, useCallback, useContext, useId, useState } from 'react'
import { cn } from '../../utils/cn'
import type {
  ModalBodyProps,
  ModalContextValue,
  ModalFooterProps,
  ModalHeaderProps,
  ModalProps,
} from './Modal.types'

export const ModalContext = createContext<ModalContextValue | null>(null)

export function useModalContext(): ModalContextValue {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('Modal components must be used within <Modal>')
  return ctx
}

export function Modal({
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  children,
}: ModalProps) {
  const contentId = useId()
  const isControlled = controlledOpen !== undefined
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const open = isControlled ? (controlledOpen as boolean) : internalOpen

  const setOpen = useCallback(
    (value: boolean) => {
      if (!isControlled) setInternalOpen(value)
      onOpenChange?.(value)
    },
    [isControlled, onOpenChange],
  )

  return (
    <ModalContext.Provider value={{ open, setOpen, contentId }}>
      {children}
    </ModalContext.Provider>
  )
}

export function ModalTrigger({ children }: { children: React.ReactElement }) {
  const { setOpen } = useModalContext()
  const child = children as React.ReactElement<Record<string, unknown>>
  return React.cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      if (typeof child.props.onClick === 'function') child.props.onClick(e)
      setOpen(true)
    },
  })
}

export function ModalClose({ children }: { children: React.ReactElement }) {
  const { setOpen } = useModalContext()
  const child = children as React.ReactElement<Record<string, unknown>>
  return React.cloneElement(child, {
    onClick: (e: React.MouseEvent) => {
      if (typeof child.props.onClick === 'function') child.props.onClick(e)
      setOpen(false)
    },
  })
}

export function ModalHeader({ children, className }: ModalHeaderProps) {
  const { contentId } = useModalContext()
  return (
    <div className={cn('aven-modal-header', className)}>
      <div id={`${contentId}-title`}>{children}</div>
    </div>
  )
}

export function ModalBody({ children, className }: ModalBodyProps) {
  const { contentId } = useModalContext()
  return (
    <div id={`${contentId}-desc`} className={cn('aven-modal-body', className)}>
      {children}
    </div>
  )
}

export function ModalFooter({ children, className }: ModalFooterProps) {
  return <div className={cn('aven-modal-footer', className)}>{children}</div>
}
