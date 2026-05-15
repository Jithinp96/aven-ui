import { Info } from 'lucide-react'
import React, { useId } from 'react'
import { cn } from '../../utils/cn'

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Label rendered above the input */
  label?: string
  /** Error message — triggers red border and shows an info icon with tooltip on hover */
  error?: string
  /** Helper text rendered below the input (hidden when error is set) */
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  /** Node rendered on the left side of the input */
  prefix?: React.ReactNode
  /** Node rendered on the right side (replaced by error icon when error is set) */
  suffix?: React.ReactNode
  fullWidth?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      prefix,
      suffix,
      fullWidth = false,
      disabled,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const hasError = !!error

    return (
      <div className={cn('aven-input-root', fullWidth && 'aven-input-root--full-width')}>
        {label && (
          <label htmlFor={inputId} className="aven-input-label">
            {label}
          </label>
        )}

        <div
          className={cn(
            'aven-input-wrapper',
            `aven-input-wrapper--${size}`,
            hasError && 'aven-input-wrapper--error',
            disabled && 'aven-input-wrapper--disabled',
          )}
        >
          {prefix && <span className="aven-input-prefix">{prefix}</span>}

          <input
            ref={ref}
            id={inputId}
            className={cn('aven-input', className)}
            disabled={disabled}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={hasError ? `${inputId}-error-tooltip` : undefined}
            {...props}
          />

          {hasError ? (
            <div
              className="aven-input-error-icon"
              aria-label="Error info"
              tabIndex={0}
            >
              <Info size={16} aria-hidden="true" />
              <div
                id={`${inputId}-error-tooltip`}
                className="aven-input-tooltip"
                role="tooltip"
              >
                {error}
              </div>
            </div>
          ) : suffix ? (
            <span className="aven-input-suffix">{suffix}</span>
          ) : null}
        </div>

        {helperText && !hasError && (
          <p className="aven-input-helper">{helperText}</p>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
