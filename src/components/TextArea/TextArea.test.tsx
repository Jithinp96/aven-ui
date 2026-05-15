import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TextArea } from './TextArea'

describe('TextArea', () => {
  it('renders a textarea', () => {
    render(<TextArea placeholder="Enter text" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('links label to textarea via htmlFor', () => {
    render(<TextArea label="Description" />)
    expect(screen.getByLabelText('Description')).toBeInTheDocument()
  })

  it('shows error icon when error prop is provided', () => {
    render(<TextArea error="This field is required" />)
    expect(screen.getByLabelText('Error info')).toBeInTheDocument()
  })

  it('renders error message inside tooltip', () => {
    render(<TextArea error="This field is required" />)
    expect(screen.getByRole('tooltip')).toHaveTextContent('This field is required')
  })

  it('sets aria-invalid on textarea when error is provided', () => {
    render(<TextArea error="Required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links textarea to tooltip via aria-describedby', () => {
    render(<TextArea error="Required" />)
    const textarea = screen.getByRole('textbox')
    const tooltipId = textarea.getAttribute('aria-describedby')
    expect(tooltipId).toBeTruthy()
    expect(document.getElementById(tooltipId!)).toHaveTextContent('Required')
  })

  it('does not show error icon when no error', () => {
    render(<TextArea placeholder="Enter text" />)
    expect(screen.queryByLabelText('Error info')).not.toBeInTheDocument()
  })

  it('does not set aria-invalid when no error', () => {
    render(<TextArea placeholder="Enter text" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('shows helper text when provided', () => {
    render(<TextArea helperText="Max 500 characters" />)
    expect(screen.getByText('Max 500 characters')).toBeInTheDocument()
  })

  it('hides helper text when error is present', () => {
    render(<TextArea helperText="Helper text" error="Error message" />)
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<TextArea disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('applies fullWidth class to root', () => {
    const { container } = render(<TextArea fullWidth />)
    expect(container.firstChild).toHaveClass('aven-textarea-root--full-width')
  })

  it('forwards ref to textarea element', () => {
    const ref = { current: null }
    render(<TextArea ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement)
  })
})
