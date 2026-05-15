import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from '../Button'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTrigger } from './Modal'
import { ModalContent } from './ModalContent'
import { ConfirmModal } from './ConfirmModal'

function BasicModal({ closeOnOverlayClick = true }: { closeOnOverlayClick?: boolean }) {
  return (
    <Modal>
      <ModalTrigger>
        <Button>Open</Button>
      </ModalTrigger>
      <ModalContent closeOnOverlayClick={closeOnOverlayClick}>
        <ModalHeader>
          <h2>Modal title</h2>
        </ModalHeader>
        <ModalBody>Modal body content</ModalBody>
        <ModalFooter>
          <ModalClose>
            <Button>Close</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

describe('Modal', () => {
  it('is closed by default', () => {
    render(<BasicModal />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens when trigger is clicked', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('renders title and body content', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByText('Modal title')).toBeInTheDocument()
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
  })

  it('closes when ModalClose child is clicked', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('closes on overlay click', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(document.querySelector('.aven-modal-overlay')!)
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('does not close on overlay click when closeOnOverlayClick is false', async () => {
    const user = userEvent.setup()
    render(<BasicModal closeOnOverlayClick={false} />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(document.querySelector('.aven-modal-overlay')!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('sets aria-modal on dialog', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
  })

  it('links aria-labelledby to header', async () => {
    const user = userEvent.setup()
    render(<BasicModal />)
    await user.click(screen.getByRole('button', { name: 'Open' }))
    const dialog = screen.getByRole('dialog')
    const labelId = dialog.getAttribute('aria-labelledby')
    expect(document.getElementById(labelId!)).toHaveTextContent('Modal title')
  })

  it('opens with defaultOpen', () => {
    render(
      <Modal defaultOpen>
        <ModalContent>
          <ModalBody>Pre-opened</ModalBody>
        </ModalContent>
      </Modal>,
    )
    expect(screen.getByText('Pre-opened')).toBeInTheDocument()
  })

  it('works in controlled mode', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <Modal open={false} onOpenChange={onOpenChange}>
        <ModalTrigger>
          <Button>Open</Button>
        </ModalTrigger>
        <ModalContent>
          <ModalBody>Content</ModalBody>
        </ModalContent>
      </Modal>,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(onOpenChange).toHaveBeenCalledWith(true)
  })
})

describe('ConfirmModal', () => {
  it('renders title', () => {
    render(
      <ConfirmModal
        open
        onOpenChange={() => {}}
        title="Delete item?"
        onConfirm={() => {}}
      />,
    )
    expect(screen.getByText('Delete item?')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <ConfirmModal
        open
        onOpenChange={() => {}}
        title="Delete?"
        description="This cannot be undone."
        onConfirm={() => {}}
      />,
    )
    expect(screen.getByText('This cannot be undone.')).toBeInTheDocument()
  })

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <ConfirmModal
        open
        onOpenChange={() => {}}
        title="Delete?"
        onConfirm={onConfirm}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onConfirm).toHaveBeenCalled()
  })

  it('calls onOpenChange(false) when cancel is clicked', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()
    render(
      <ConfirmModal
        open
        onOpenChange={onOpenChange}
        title="Delete?"
        onConfirm={() => {}}
      />,
    )
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('shows custom labels', () => {
    render(
      <ConfirmModal
        open
        onOpenChange={() => {}}
        title="Delete?"
        confirmLabel="Yes, delete"
        cancelLabel="Never mind"
        onConfirm={() => {}}
      />,
    )
    expect(screen.getByRole('button', { name: 'Yes, delete' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Never mind' })).toBeInTheDocument()
  })

  it('disables cancel button when loading', () => {
    render(
      <ConfirmModal
        open
        onOpenChange={() => {}}
        title="Delete?"
        loading
        onConfirm={() => {}}
      />,
    )
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
  })

  it('does not close on overlay click when loading', async () => {
    const user = userEvent.setup()
    render(
      <ConfirmModal
        open
        onOpenChange={() => {}}
        title="Processing..."
        loading
        onConfirm={() => new Promise(() => {})}
      />,
    )
    await user.click(document.querySelector('.aven-modal-overlay')!)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })
})
