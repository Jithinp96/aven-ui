import React from 'react'
import { Slot } from '../../primitives/Slot'
import { cn } from '../../utils/cn'
import { buttonVariants, type ButtonVariants } from './Button.variants'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariants {
  /** Merges props onto the immediate child element instead of rendering a <button> */
  asChild?: boolean
  /** Shows a spinner and disables the button */
  loading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      size,
      shape,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    if (asChild) {
      return (
        <Slot
          ref={ref as React.Ref<HTMLElement>}
          className={cn(buttonVariants({ intent, size, shape }), className)}
          {...(props as Record<string, unknown>)}
        >
          {children}
        </Slot>
      )
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ intent, size, shape }), className)}
        disabled={disabled ?? loading}
        data-loading={loading ? 'true' : undefined}
        {...props}
      >
        {loading && <span className="aven-btn__spinner" aria-hidden="true" />}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
