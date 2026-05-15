import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button'
import { Input } from '../Input'
import { Modal, ModalBody, ModalClose, ModalFooter, ModalHeader, ModalTrigger } from './Modal'
import { ModalContent } from './ModalContent'
import { ConfirmModal } from './ConfirmModal'

const meta: Meta = {
  title: 'Components/Modal',
  decorators: [
    (Story) => (
      <div style={{ padding: 24, minHeight: 300 }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button intent="primary">Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <h2>Edit profile</h2>
        </ModalHeader>
        <ModalBody>
          <p>Make changes to your profile here. Click save when you are done.</p>
        </ModalBody>
        <ModalFooter>
          <ModalClose>
            <Button intent="outline">Cancel</Button>
          </ModalClose>
          <ModalClose>
            <Button intent="primary">Save changes</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const WithForm: Story = {
  render: () => (
    <Modal>
      <ModalTrigger>
        <Button intent="primary">Edit profile</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <h2>Edit profile</h2>
        </ModalHeader>
        <ModalBody>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Input label="Full name" placeholder="John Doe" defaultValue="John Doe" />
            <Input label="Email" type="email" placeholder="you@example.com" defaultValue="john@example.com" />
            <Input label="Username" placeholder="johndoe" defaultValue="johndoe" />
          </div>
        </ModalBody>
        <ModalFooter>
          <ModalClose>
            <Button intent="outline">Cancel</Button>
          </ModalClose>
          <ModalClose>
            <Button intent="primary">Save changes</Button>
          </ModalClose>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
}

export const ConfirmDelete: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button intent="danger" onClick={() => setOpen(true)}>Delete item</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Delete this item?"
          description="This action cannot be undone. The item will be permanently removed."
          confirmLabel="Delete"
          intent="danger"
          onConfirm={() => new Promise((r) => setTimeout(r, 1500))}
        />
      </>
    )
  },
}

export const ConfirmPrimary: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button intent="primary" onClick={() => setOpen(true)}>Publish post</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Publish this post?"
          description="Once published, the post will be visible to all users."
          confirmLabel="Publish"
          intent="primary"
          onConfirm={() => new Promise((r) => setTimeout(r, 1000))}
        />
      </>
    )
  },
}

export const NoDescription: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Confirm action</Button>
        <ConfirmModal
          open={open}
          onOpenChange={setOpen}
          title="Are you sure?"
          onConfirm={() => {}}
        />
      </>
    )
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Modal key={size}>
          <ModalTrigger>
            <Button intent="outline">{size.toUpperCase()}</Button>
          </ModalTrigger>
          <ModalContent size={size}>
            <ModalHeader>
              <h2>{size.toUpperCase()} modal</h2>
            </ModalHeader>
            <ModalBody>
              This is a <strong>{size}</strong> sized modal. Max width:{' '}
              {size === 'sm' ? '400px' : size === 'md' ? '520px' : size === 'lg' ? '680px' : '860px'}.
            </ModalBody>
            <ModalFooter>
              <ModalClose>
                <Button intent="primary">Got it</Button>
              </ModalClose>
            </ModalFooter>
          </ModalContent>
        </Modal>
      ))}
    </div>
  ),
}

export const Controlled: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <Button intent="primary" onClick={() => setOpen(true)}>Open</Button>
          <span style={{ fontSize: 13, color: '#64748b' }}>
            State: <strong>{open ? 'open' : 'closed'}</strong>
          </span>
        </div>
        <Modal open={open} onOpenChange={setOpen}>
          <ModalContent>
            <ModalHeader>
              <h2>Controlled modal</h2>
            </ModalHeader>
            <ModalBody>Open state is managed externally.</ModalBody>
            <ModalFooter>
              <Button intent="primary" onClick={() => setOpen(false)}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  },
}
