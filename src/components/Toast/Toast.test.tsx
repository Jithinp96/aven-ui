import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Toaster } from './Toaster'
import { ToastProvider, useToastContext } from './ToastProvider'
import { useToast } from './useToast'

function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      {children}
      <Toaster />
    </ToastProvider>
  )
}

function ShowButton({
  type,
  message,
  title,
  duration,
}: {
  type: 'success' | 'error' | 'warning' | 'info' | 'show'
  message: string
  title?: string
  duration?: number
}) {
  const { toast } = useToast()
  return (
    <button onClick={() => toast[type](message, { title, duration })}>Show</button>
  )
}

function ProgrammaticDismissTest() {
  const [id, setId] = React.useState('')
  const { add, remove } = useToastContext()
  return (
    <>
      <button onClick={() => setId(add({ message: 'test', type: 'info', duration: 0 }))}>
        Add
      </button>
      {id && (
        <button onClick={() => remove(id)}>Remove by ID</button>
      )}
    </>
  )
}

describe('Toast', () => {
  it('renders a success toast', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="success" message="Saved!" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('Saved!')).toBeInTheDocument()
  })

  it('renders an error toast', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="error" message="Something went wrong" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
  })

  it('renders a warning toast', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="warning" message="Watch out" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('Watch out')).toBeInTheDocument()
  })

  it('renders an info toast', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="info" message="FYI" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('FYI')).toBeInTheDocument()
  })

  it('renders toast with title and message', async () => {
    const user = userEvent.setup()
    render(
      <ShowButton type="success" message="File uploaded." title="Upload complete" />,
      { wrapper: Wrapper },
    )
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('Upload complete')).toBeInTheDocument()
    expect(screen.getByText('File uploaded.')).toBeInTheDocument()
  })

  it('dismisses when close button is clicked', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="success" message="Saved!" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    await user.click(screen.getByRole('button', { name: 'Close' }))
    await waitFor(() => expect(screen.queryByText('Saved!')).not.toBeInTheDocument())
  })

  it('auto-dismisses after duration', async () => {
    const user = userEvent.setup()
    render(
      <ShowButton type="success" message="Gone soon" duration={50} />,
      { wrapper: Wrapper },
    )
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByText('Gone soon')).toBeInTheDocument()
    await waitFor(
      () => expect(screen.queryByText('Gone soon')).not.toBeInTheDocument(),
      { timeout: 500 },
    )
  })

  it('error toast does not auto-dismiss by default', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="error" message="Persistent error" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    await new Promise((r) => setTimeout(r, 100))
    expect(screen.getByText('Persistent error')).toBeInTheDocument()
  })

  it('dismisses programmatically', async () => {
    const user = userEvent.setup()
    render(<ProgrammaticDismissTest />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Add' }))
    expect(screen.getByText('test')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove by ID' }))
    await waitFor(() => expect(screen.queryByText('test')).not.toBeInTheDocument())
  })

  it('renders multiple toasts simultaneously', async () => {
    const user = userEvent.setup()
    render(
      <>
        <ShowButton type="success" message="First" />
        <ShowButton type="info" message="Second" />
      </>,
      { wrapper: Wrapper },
    )
    await user.click(screen.getAllByRole('button', { name: 'Show' })[0]!)
    await user.click(screen.getAllByRole('button', { name: 'Show' })[1]!)
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('throws when useToast is used outside ToastProvider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() =>
      render(<ShowButton type="success" message="test" />),
    ).toThrow('useToast must be used within <ToastProvider>')
    consoleError.mockRestore()
  })

  it('uses role=alert for error toasts', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="error" message="Critical error" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('uses role=status for non-error toasts', async () => {
    const user = userEvent.setup()
    render(<ShowButton type="success" message="Done" />, { wrapper: Wrapper })
    await user.click(screen.getByRole('button', { name: 'Show' }))
    expect(screen.getByRole('status')).toBeInTheDocument()
  })
})
