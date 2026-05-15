import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from 'lucide-react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    label: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    placeholder: 'Enter text...',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    helperText: 'We will never share your email.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    error: 'Please enter a valid email address.',
  },
}

export const ErrorWithLongMessage: Story = {
  args: {
    label: 'Password',
    placeholder: '••••••••',
    error: 'Password must be at least 8 characters and include one number and one special character.',
  },
}

export const WithPrefix: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search anything...',
    prefix: <Search size={16} />,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Username',
    value: 'jithin_dev',
    disabled: true,
  },
}

export const Small: Story = {
  args: { size: 'sm', label: 'Small input', placeholder: 'Small...' },
}

export const Large: Story = {
  args: { size: 'lg', label: 'Large input', placeholder: 'Large...' },
}

export const FullWidth: Story = {
  args: {
    label: 'Full width input',
    placeholder: 'Takes full width of container',
    fullWidth: true,
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '320px' }}>
      <Input size="sm" label="Small" placeholder="Small input" />
      <Input size="md" label="Medium" placeholder="Medium input" />
      <Input size="lg" label="Large" placeholder="Large input" />
    </div>
  ),
}

export const ErrorHoverTooltip: Story = {
  name: 'Error — hover the icon to see tooltip',
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    defaultValue: 'not-an-email',
    error: 'Please enter a valid email address.',
  },
}
