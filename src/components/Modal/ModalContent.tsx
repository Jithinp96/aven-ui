import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import type { ModalContentProps } from './Modal.types'
import { useModalContext } from './Modal'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const ANIMATION_DURATION = 150

export function ModalContent({
  children,
  size = 'md',
  closeOnOverlayClick = true,
  className,
}: ModalContentProps) {
  const { open, setOpen, contentId } = useModalContext()
  const [shouldRender, setShouldRender] = useState(open)
  const [isClosing, setIsClosing] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  // Mount / unmount with animation
  useEffect(() => {
    if (open) {
      setShouldRender(true)
      setIsClosing(false)
    } else if (shouldRender) {
      setIsClosing(true)
      const t = setTimeout(() => {
        setShouldRender(false)
        setIsClosing(false)
      }, ANIMATION_DURATION)
      return () => clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  // Save focus + auto-focus first element on open
  useEffect(() => {
    if (!shouldRender || isClosing) return
    previousFocusRef.current = document.activeElement as HTMLElement
    requestAnimationFrame(() => {
      const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE)
      if (first) {
        first.focus()
      } else {
        dialogRef.current?.focus()
      }
    })
    return () => {
      previousFocusRef.current?.focus()
    }
  }, [shouldRender, isClosing])

  // Scroll lock
  useEffect(() => {
    if (!shouldRender || isClosing) return
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [shouldRender, isClosing])

  // Keyboard: Escape + focus trap
  useEffect(() => {
    if (!shouldRender || isClosing) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [shouldRender, isClosing, handleClose])

  if (!shouldRender || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={cn('aven-modal-overlay', isClosing && 'aven-modal-overlay--closing')}
      onClick={closeOnOverlayClick ? handleClose : undefined}
    >
      <div
        ref={dialogRef}
        className={cn(
          'aven-modal',
          `aven-modal--${size}`,
          isClosing && 'aven-modal--closing',
          className,
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${contentId}-title`}
        aria-describedby={`${contentId}-desc`}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
