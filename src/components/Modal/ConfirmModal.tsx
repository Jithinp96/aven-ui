import { useState } from 'react'
import { Button } from '../Button'
import { Modal, ModalBody, ModalFooter, ModalHeader } from './Modal'
import { ModalContent } from './ModalContent'
import type { ConfirmModalProps } from './Modal.types'

export function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  intent = 'primary',
  onConfirm,
  loading: externalLoading = false,
}: ConfirmModalProps) {
  const [internalLoading, setInternalLoading] = useState(false)
  const loading = externalLoading || internalLoading

  const handleConfirm = async () => {
    setInternalLoading(true)
    try {
      await onConfirm()
      onOpenChange(false)
    } finally {
      setInternalLoading(false)
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="sm" closeOnOverlayClick={!loading}>
        <ModalHeader>
          <h2 className="aven-confirm-modal-title">{title}</h2>
        </ModalHeader>
        {description && (
          <ModalBody>
            <p className="aven-confirm-modal-description">{description}</p>
          </ModalBody>
        )}
        <ModalFooter>
          <Button
            intent="outline"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            {cancelLabel}
          </Button>
          <Button intent={intent} loading={loading} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
