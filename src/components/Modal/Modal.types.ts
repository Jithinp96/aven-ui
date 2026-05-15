import type React from 'react'

export interface ModalContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  contentId: string
}

export interface ModalProps {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

export interface ModalContentProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  closeOnOverlayClick?: boolean
  className?: string
}

export interface ModalHeaderProps {
  children: React.ReactNode
  className?: string
}

export interface ModalBodyProps {
  children: React.ReactNode
  className?: string
}

export interface ModalFooterProps {
  children: React.ReactNode
  className?: string
}

export interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  intent?: 'primary' | 'danger'
  onConfirm: () => void | Promise<void>
  loading?: boolean
}
