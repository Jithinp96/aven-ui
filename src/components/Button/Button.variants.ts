import { cva, type VariantProps } from 'class-variance-authority'

export const buttonVariants = cva('aven-btn', {
  variants: {
    intent: {
      default: 'aven-btn--default',
      primary: 'aven-btn--primary',
      danger: 'aven-btn--danger',
      ghost: 'aven-btn--ghost',
      outline: 'aven-btn--outline',
    },
    size: {
      sm: 'aven-btn--sm',
      md: 'aven-btn--md',
      lg: 'aven-btn--lg',
    },
    shape: {
      default: '',
      pill: 'aven-btn--pill',
      square: 'aven-btn--square',
    },
  },
  defaultVariants: {
    intent: 'default',
    size: 'md',
    shape: 'default',
  },
})

export type ButtonVariants = VariantProps<typeof buttonVariants>
