export interface DropdownOption {
  label: string
  value: string
  disabled?: boolean
}

export interface DropdownProps {
  options?: DropdownOption[]
  /** Controlled value — string for single, string[] for multi */
  value?: string | string[]
  defaultValue?: string | string[]
  onChange?: (value: string | string[]) => void
  label?: string
  placeholder?: string
  /** Error message — triggers red border and info icon with tooltip */
  error?: string
  helperText?: string
  /** Shows a loading spinner instead of the options list */
  loading?: boolean
  /** Enables multi-select mode */
  multiple?: boolean
  /** Adds a search input to filter options */
  searchable?: boolean
  /** Shows a clear button when a value is selected */
  clearable?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  /** Max height of the options list in px */
  maxHeight?: number
  id?: string
  className?: string
}
