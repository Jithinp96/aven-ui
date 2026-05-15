import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toaster } from './Toaster'
import { ToastProvider } from './ToastProvider'
import { useToast } from './useToast'

const meta: Meta = {
  title: 'Components/Toast',
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ padding: '16px', minHeight: 120 }}>
          <Story />
        </div>
        <Toaster />
      </ToastProvider>
    ),
  ],
}

export default meta
type Story = StoryObj

function ToastButtons() {
  const { toast } = useToast()
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.success('Changes saved successfully.')}
      >
        Success
      </button>
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.error('Something went wrong. Please try again.')}
      >
        Error
      </button>
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#f59e0b', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.warning('Your session is about to expire.')}
      >
        Warning
      </button>
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.info('A new version is available.')}
      >
        Info
      </button>
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#334155', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.show('This is a default notification.')}
      >
        Default
      </button>
    </div>
  )
}

export const AllTypes: Story = {
  render: () => <ToastButtons />,
}

export const WithTitle: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          style={{ padding: '8px 14px', borderRadius: 6, background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => toast.success('Your file has been uploaded.', { title: 'Upload complete' })}
        >
          With title (success)
        </button>
        <button
          style={{ padding: '8px 14px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => toast.error('Check the error logs for more details.', { title: 'Deployment failed' })}
        >
          With title (error)
        </button>
      </div>
    )
  },
}

export const PersistentError: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#ef4444', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.error('This error stays until dismissed.')}
      >
        Show persistent error
      </button>
    )
  },
}

export const CustomDuration: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          style={{ padding: '8px 14px', borderRadius: 6, background: '#22c55e', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => toast.success('Disappears in 1 second', { duration: 1000 })}
        >
          1 second
        </button>
        <button
          style={{ padding: '8px 14px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => toast.info('Stays for 8 seconds', { duration: 8000 })}
        >
          8 seconds
        </button>
        <button
          style={{ padding: '8px 14px', borderRadius: 6, background: '#334155', color: '#fff', border: 'none', cursor: 'pointer' }}
          onClick={() => toast.show('Never auto-dismisses', { duration: 0 })}
        >
          Persistent
        </button>
      </div>
    )
  },
}

export const MultipleToasts: Story = {
  render: () => {
    const { toast } = useToast()
    return (
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#334155', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => {
          toast.success('Step 1 complete')
          toast.info('Step 2 in progress')
          toast.warning('Step 3 needs attention')
        }}
      >
        Show 3 toasts at once
      </button>
    )
  },
}

export const TopRight: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ padding: '16px', minHeight: 120 }}>
          <Story />
        </div>
        <Toaster position="top-right" />
      </ToastProvider>
    ),
  ],
  render: () => {
    const { toast } = useToast()
    return (
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.success('Appears top-right')}
      >
        Top right
      </button>
    )
  },
}

export const BottomCenter: Story = {
  decorators: [
    (Story) => (
      <ToastProvider>
        <div style={{ padding: '16px', minHeight: 120 }}>
          <Story />
        </div>
        <Toaster position="bottom-center" />
      </ToastProvider>
    ),
  ],
  render: () => {
    const { toast } = useToast()
    return (
      <button
        style={{ padding: '8px 14px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer' }}
        onClick={() => toast.info('Appears bottom-center')}
      >
        Bottom center
      </button>
    )
  },
}
