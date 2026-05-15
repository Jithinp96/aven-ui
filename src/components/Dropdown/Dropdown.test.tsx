import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dropdown } from './Dropdown'

const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
  { label: 'Grape', value: 'grape', disabled: true },
]

describe('Dropdown', () => {
  it('renders trigger with placeholder', () => {
    render(<Dropdown options={options} placeholder="Pick a fruit" />)
    expect(screen.getByRole('button', { name: /pick a fruit/i })).toBeInTheDocument()
  })

  it('opens the list on trigger click', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('closes the list after selecting an option', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('option', { name: 'Apple' }))
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
  })

  it('calls onChange with selected value', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Dropdown options={options} onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('option', { name: 'Apple' }))
    expect(onChange).toHaveBeenCalledWith('apple')
  })

  it('shows selected label in trigger', async () => {
    render(<Dropdown options={options} value="banana" />)
    expect(screen.getByRole('button')).toHaveTextContent('Banana')
  })

  it('does not call onChange for disabled option', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Dropdown options={options} onChange={onChange} />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('option', { name: 'Grape' }))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('shows error icon when error prop is provided', () => {
    render(<Dropdown options={options} error="Please select an option" />)
    expect(screen.getByLabelText('Error info')).toBeInTheDocument()
  })

  it('renders error message in tooltip', () => {
    render(<Dropdown options={options} error="Please select an option" />)
    expect(screen.getByRole('tooltip')).toHaveTextContent('Please select an option')
  })

  it('sets aria-invalid when error is provided', () => {
    render(<Dropdown options={options} error="Required" />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-invalid', 'true')
  })

  it('shows helper text when provided', () => {
    render(<Dropdown options={options} helperText="Choose your favourite" />)
    expect(screen.getByText('Choose your favourite')).toBeInTheDocument()
  })

  it('hides helper text when error is present', () => {
    render(<Dropdown options={options} helperText="Helper" error="Error" />)
    expect(screen.queryByText('Helper')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Dropdown options={options} disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading state', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} loading />)
    await user.click(screen.getByRole('button'))
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
  })

  it('keeps list open in multi-select after selecting', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} multiple />)
    await user.click(screen.getByRole('button'))
    await user.click(screen.getByRole('option', { name: 'Apple' }))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
  })

  it('shows count when multiple values selected', () => {
    render(<Dropdown options={options} multiple value={['apple', 'banana']} />)
    expect(screen.getByRole('button')).toHaveTextContent('2 selected')
  })

  it('closes on Escape key', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} />)
    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument())
  })

  it('filters options when searchable and typing', async () => {
    const user = userEvent.setup()
    render(<Dropdown options={options} searchable />)
    await user.click(screen.getByRole('button'))
    await user.type(screen.getByPlaceholderText('Search...'), 'app')
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Banana' })).not.toBeInTheDocument()
  })
})
