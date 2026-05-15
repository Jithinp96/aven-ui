import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Dropdown } from './Dropdown'

const fruits = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Mango', value: 'mango' },
  { label: 'Orange', value: 'orange' },
  { label: 'Pineapple', value: 'pineapple' },
  { label: 'Strawberry', value: 'strawberry' },
  { label: 'Watermelon', value: 'watermelon' },
]

const fruitsWithDisabled = [
  ...fruits.slice(0, 4),
  { label: 'Durian (unavailable)', value: 'durian', disabled: true },
  ...fruits.slice(4),
]

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    helperText: { control: 'text' },
    loading: { control: 'boolean' },
    multiple: { control: 'boolean' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
  args: {
    options: fruits,
    placeholder: 'Select a fruit...',
    size: 'md',
    loading: false,
    multiple: false,
    searchable: false,
    clearable: false,
    disabled: false,
    fullWidth: false,
  },
  decorators: [
    (Story) => (
      <div style={{ minHeight: 300, padding: '16px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Dropdown>

export const Default: Story = {
  args: { label: 'Fruit' },
}

export const WithHelperText: Story = {
  args: {
    label: 'Favourite fruit',
    helperText: 'We use this to personalise your experience.',
  },
}

export const WithError: Story = {
  args: {
    label: 'Fruit',
    error: 'Please select a fruit to continue.',
  },
}

export const Loading: Story = {
  args: {
    label: 'Fruit',
    loading: true,
    placeholder: 'Loading options...',
  },
}

export const Searchable: Story = {
  args: {
    label: 'Fruit',
    searchable: true,
    placeholder: 'Search and select...',
  },
}

export const Clearable: Story = {
  args: {
    label: 'Fruit',
    clearable: true,
    defaultValue: 'apple',
  },
}

export const WithDisabledOptions: Story = {
  args: {
    label: 'Fruit',
    options: fruitsWithDisabled,
  },
}

export const MultiSelect: Story = {
  args: {
    label: 'Favourite fruits',
    multiple: true,
    placeholder: 'Select multiple...',
  },
}

export const MultiSelectWithSearch: Story = {
  args: {
    label: 'Favourite fruits',
    multiple: true,
    searchable: true,
    clearable: true,
    placeholder: 'Search and select...',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Fruit',
    disabled: true,
    defaultValue: 'apple',
  },
}

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Dropdown
          label="Fruit (controlled)"
          options={fruits}
          value={value}
          onChange={(v) => setValue(v as string)}
          clearable
        />
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Selected: <strong>{value || 'none'}</strong>
        </p>
      </div>
    )
  },
}

export const ControlledMulti: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([])
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Dropdown
          label="Fruits (controlled multi)"
          options={fruits}
          multiple
          searchable
          clearable
          value={value}
          onChange={(v) => setValue(v as string[])}
        />
        <p style={{ fontSize: 13, color: '#64748b' }}>
          Selected: <strong>{value.length > 0 ? value.join(', ') : 'none'}</strong>
        </p>
      </div>
    )
  },
}

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 280 }}>
      <Dropdown options={fruits} size="sm" label="Small" placeholder="Small dropdown" />
      <Dropdown options={fruits} size="md" label="Medium" placeholder="Medium dropdown" />
      <Dropdown options={fruits} size="lg" label="Large" placeholder="Large dropdown" />
    </div>
  ),
}
