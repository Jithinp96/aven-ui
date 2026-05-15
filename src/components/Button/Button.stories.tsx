import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    intent: {
      control: 'select',
      options: ['default', 'primary', 'danger', 'ghost', 'outline'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    shape: {
      control: 'select',
      options: ['default', 'pill', 'square'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    children: 'Button',
    intent: 'default',
    size: 'md',
    shape: 'default',
    loading: false,
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Primary: Story = {
  args: { intent: 'primary', children: 'Save changes' },
}

export const Danger: Story = {
  args: { intent: 'danger', children: 'Delete item' },
}

export const Ghost: Story = {
  args: { intent: 'ghost', children: 'Cancel' },
}

export const Outline: Story = {
  args: { intent: 'outline', children: 'Learn more' },
}

export const Small: Story = {
  args: { size: 'sm', intent: 'primary', children: 'Small' },
}

export const Large: Story = {
  args: { size: 'lg', intent: 'primary', children: 'Large' },
}

export const Pill: Story = {
  args: { shape: 'pill', intent: 'primary', children: 'Pill shape' },
}

export const Loading: Story = {
  args: { intent: 'primary', loading: true, children: 'Saving...' },
}

export const Disabled: Story = {
  args: { intent: 'primary', disabled: true, children: 'Unavailable' },
}

export const AsLink: Story = {
  args: { intent: 'outline', asChild: true },
  render: (args) => (
    <Button {...args}>
      <a href="https://example.com" target="_blank" rel="noreferrer">
        Open link
      </a>
    </Button>
  ),
}

export const AllIntents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <Button intent="default">Default</Button>
      <Button intent="primary">Primary</Button>
      <Button intent="danger">Danger</Button>
      <Button intent="ghost">Ghost</Button>
      <Button intent="outline">Outline</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Button intent="primary" size="sm">Small</Button>
      <Button intent="primary" size="md">Medium</Button>
      <Button intent="primary" size="lg">Large</Button>
    </div>
  ),
}
