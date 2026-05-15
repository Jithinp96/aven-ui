import { Info } from 'lucide-react'
import React, { useId } from 'react'
import { cn } from '../../utils/cn'

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label rendered above the textarea */
  label?: string
  /** Error message — triggers red border and shows an info icon with tooltip on hover */
  error?: string
  /** Helper text rendered below the textarea (hidden when error is set) */
  helperText?: string
  size?: 'sm' | 'md' | 'lg'
  /** Controls resize behaviour of the textarea */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both'
  fullWidth?: boolean
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      resize = 'vertical',
      fullWidth = false,
      disabled,
      className,
      id,
      style,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId()
    const textareaId = id ?? generatedId
    const hasError = !!error

    return (
      <div className={cn('aven-textarea-root', fullWidth && 'aven-textarea-root--full-width')}>
        {label && (
          <label htmlFor={textareaId} className="aven-textarea-label">
            {label}
          </label>
        )}

        <div
          className={cn(
            'aven-textarea-wrapper',
            `aven-textarea-wrapper--${size}`,
            hasError && 'aven-textarea-wrapper--error',
            disabled && 'aven-textarea-wrapper--disabled',
          )}
        >
          <textarea
            ref={ref}
            id={textareaId}
            className={cn('aven-textarea', className)}
            disabled={disabled}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={hasError ? `${textareaId}-error-tooltip` : undefined}
            style={{ resize, ...style }}
            {...props}
          />

          {hasError && (
            <div
              className="aven-textarea-error-icon"
              aria-label="Error info"
              tabIndex={0}
            >
              <Info size={16} aria-hidden="true" />
              <div
                id={`${textareaId}-error-tooltip`}
                className="aven-textarea-tooltip"
                role="tooltip"
              >
                {error}
              </div>
            </div>
          )}
        </div>

        {helperText && !hasError && (
          <p className="aven-textarea-helper">{helperText}</p>
        )}
      </div>
    )
  },
)

TextArea.displayName = 'TextArea'
