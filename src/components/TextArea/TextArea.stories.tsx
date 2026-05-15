import type { Meta, StoryObj } from '@storybook/react-vite'
import { TextArea } from './TextArea'

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
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
    resize: 'vertical',
    disabled: false,
    fullWidth: false,
  },
}

export default meta
type Story = StoryObj<typeof TextArea>

export const Default: Story = {}

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Write a short description...',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Write a short description...',
    error: 'Description is required.',
  },
}

export const ErrorHoverTooltip: Story = {
  name: 'Error — hover the icon to see tooltip',
  args: {
    label: 'Message',
    defaultValue: 'Hi',
    error: 'Message must be at least 20 characters long.',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Notes',
    value: 'This field cannot be edited.',
    disabled: true,
  },
}

export const ResizeNone: Story = {
  args: {
    label: 'Fixed size',
    placeholder: 'Cannot be resized...',
    resize: 'none',
    rows: 4,
  },
}

export const Small: Story = {
  args: { size: 'sm', label: 'Small', placeholder: 'Small textarea...' },
}

export const Large: Story = {
  args: { size: 'lg', label: 'Large', placeholder: 'Large textarea...' },
}

export const FullWidth: Story = {
  args: {
    label: 'Full width',
    placeholder: 'Takes full width of the container...',
    fullWidth: true,
    rows: 5,
  },
}
