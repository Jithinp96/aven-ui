import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('renders a text input', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('links label to input via htmlFor', () => {
    render(<Input label="Email address" />)
    expect(screen.getByLabelText('Email address')).toBeInTheDocument()
  })

  it('shows error icon when error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByLabelText('Error info')).toBeInTheDocument()
  })

  it('renders error message inside tooltip', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByRole('tooltip')).toHaveTextContent('This field is required')
  })

  it('sets aria-invalid on input when error is provided', () => {
    render(<Input error="Required" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
  })

  it('links input to tooltip via aria-describedby', () => {
    render(<Input error="Required" />)
    const input = screen.getByRole('textbox')
    const tooltipId = input.getAttribute('aria-describedby')
    expect(tooltipId).toBeTruthy()
    expect(document.getElementById(tooltipId!)).toHaveTextContent('Required')
  })

  it('does not show error icon when no error', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.queryByLabelText('Error info')).not.toBeInTheDocument()
  })

  it('does not set aria-invalid when no error', () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByRole('textbox')).not.toHaveAttribute('aria-invalid')
  })

  it('shows helper text when provided', () => {
    render(<Input helperText="We will never share your email" />)
    expect(screen.getByText('We will never share your email')).toBeInTheDocument()
  })

  it('hides helper text when error is present', () => {
    render(<Input helperText="Helper text" error="Error message" />)
    expect(screen.queryByText('Helper text')).not.toBeInTheDocument()
  })

  it('renders suffix when no error', () => {
    render(<Input suffix={<span>suffix</span>} />)
    expect(screen.getByText('suffix')).toBeInTheDocument()
  })

  it('replaces suffix with error icon when error is set', () => {
    render(<Input suffix={<span>suffix</span>} error="Error" />)
    expect(screen.queryByText('suffix')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Error info')).toBeInTheDocument()
  })

  it('is disabled when disabled prop is set', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('applies fullWidth class to root', () => {
    const { container } = render(<Input fullWidth />)
    expect(container.firstChild).toHaveClass('aven-input-root--full-width')
  })

  it('forwards ref to input element', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })
})
