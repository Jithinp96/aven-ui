import { Check, ChevronDown, Info, Loader2, X } from 'lucide-react'
import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from '../../utils/cn'
import type { DropdownOption, DropdownProps } from './Dropdown.types'

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options = [],
      value: controlledValue,
      defaultValue,
      onChange,
      label,
      placeholder = 'Select...',
      error,
      helperText,
      loading = false,
      multiple = false,
      searchable = false,
      clearable = false,
      disabled = false,
      size = 'md',
      fullWidth = false,
      maxHeight = 240,
      id,
      className,
    },
    ref,
  ) => {
    const generatedId = useId()
    const dropdownId = id ?? generatedId
    const hasError = !!error

    const isControlled = controlledValue !== undefined
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue ?? (multiple ? [] : ''),
    )
    const currentValue = isControlled ? controlledValue : internalValue

    const [isOpen, setIsOpen] = useState(false)
    const [search, setSearch] = useState('')
    const [focusedIndex, setFocusedIndex] = useState(-1)
    const [contentStyle, setContentStyle] = useState<React.CSSProperties>({})

    const triggerRef = useRef<HTMLButtonElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const searchRef = useRef<HTMLInputElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

    const selectedValues = useMemo(() => {
      if (multiple) return Array.isArray(currentValue) ? currentValue : []
      return typeof currentValue === 'string' && currentValue ? [currentValue] : []
    }, [currentValue, multiple])

    const filteredOptions = useMemo(() => {
      if (!searchable || !search.trim()) return options
      const q = search.toLowerCase()
      return options.filter((o) => o.label.toLowerCase().includes(q))
    }, [options, search, searchable])

    const displayValue = useMemo(() => {
      if (selectedValues.length === 0) return undefined
      if (selectedValues.length === 1) {
        return options.find((o) => o.value === selectedValues[0])?.label
      }
      return `${selectedValues.length} selected`
    }, [selectedValues, options])

    const computePosition = useCallback(() => {
      if (!triggerRef.current) return
      const rect = triggerRef.current.getBoundingClientRect()
      const spaceBelow = window.innerHeight - rect.bottom
      const spaceAbove = rect.top

      const base: React.CSSProperties = {
        position: 'fixed',
        left: rect.left,
        width: rect.width,
        maxHeight,
        zIndex: 1000,
      }

      if (spaceBelow >= 200 || spaceBelow >= spaceAbove) {
        setContentStyle({ ...base, top: rect.bottom + 4 })
      } else {
        setContentStyle({ ...base, bottom: window.innerHeight - rect.top + 4 })
      }
    }, [maxHeight])

    const close = useCallback(() => {
      setIsOpen(false)
      setSearch('')
      setFocusedIndex(-1)
      triggerRef.current?.focus()
    }, [])

    const open = useCallback(() => {
      if (disabled || loading) return
      computePosition()
      setIsOpen(true)
      setSearch('')
      setFocusedIndex(-1)
    }, [disabled, loading, computePosition])

    const toggle = () => (isOpen ? close() : open())

    const handleSelect = useCallback(
      (optionValue: string) => {
        let next: string | string[]

        if (multiple) {
          const arr = Array.isArray(currentValue) ? currentValue : []
          next = arr.includes(optionValue)
            ? arr.filter((v) => v !== optionValue)
            : [...arr, optionValue]
        } else {
          next = optionValue
          close()
        }

        if (!isControlled) setInternalValue(next)
        onChange?.(next)
      },
      [multiple, currentValue, isControlled, onChange, close],
    )

    const handleClear = (e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation()
      const next: string | string[] = multiple ? [] : ''
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    }

    // Outside click
    useEffect(() => {
      if (!isOpen) return

      const handler = (e: PointerEvent) => {
        const target = e.target as Node
        if (
          triggerRef.current?.contains(target) ||
          contentRef.current?.contains(target)
        )
          return
        close()
      }

      document.addEventListener('pointerdown', handler)
      return () => document.removeEventListener('pointerdown', handler)
    }, [isOpen, close])

    // Keyboard navigation
    useEffect(() => {
      if (!isOpen) return

      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          close()
          return
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          setFocusedIndex((i) => Math.min(i + 1, filteredOptions.length - 1))
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          setFocusedIndex((i) => Math.max(i - 1, 0))
        } else if (e.key === 'Enter' || e.key === ' ') {
          const focused = filteredOptions[focusedIndex]
          if (focused && !focused.disabled) {
            e.preventDefault()
            handleSelect(focused.value)
          }
        }
      }

      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }, [isOpen, focusedIndex, filteredOptions, close, handleSelect])

    // Scroll focused option into view
    useEffect(() => {
      if (focusedIndex < 0 || !listRef.current) return
      const item = listRef.current.children[focusedIndex] as HTMLElement
      item?.scrollIntoView?.({ block: 'nearest' })
    }, [focusedIndex])

    // Auto-focus search input when open
    useEffect(() => {
      if (isOpen && searchable) {
        requestAnimationFrame(() => searchRef.current?.focus())
      }
    }, [isOpen, searchable])

    const showClear = clearable && selectedValues.length > 0 && !disabled

    return (
      <div
        ref={ref}
        className={cn(
          'aven-dropdown-root',
          fullWidth && 'aven-dropdown-root--full-width',
          className,
        )}
      >
        {label && (
          <label htmlFor={dropdownId} className="aven-dropdown-label">
            {label}
          </label>
        )}

        <div className="aven-dropdown-trigger-wrapper">
          <button
            ref={triggerRef}
            id={dropdownId}
            type="button"
            className={cn(
              'aven-dropdown-trigger',
              `aven-dropdown-trigger--${size}`,
              isOpen && 'aven-dropdown-trigger--open',
              hasError && 'aven-dropdown-trigger--error',
              disabled && 'aven-dropdown-trigger--disabled',
            )}
            disabled={disabled}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
            aria-invalid={hasError ? true : undefined}
            aria-describedby={hasError ? `${dropdownId}-error-tooltip` : undefined}
            onClick={toggle}
          >
            <span
              className={cn(
                'aven-dropdown-value',
                !displayValue && 'aven-dropdown-placeholder',
              )}
            >
              {displayValue ?? placeholder}
            </span>

            <span className="aven-dropdown-actions">
              {showClear && (
                <span
                  className="aven-dropdown-clear"
                  role="button"
                  aria-label="Clear selection"
                  tabIndex={0}
                  onClick={handleClear}
                  onKeyDown={(e) => e.key === 'Enter' && handleClear(e)}
                >
                  <X size={14} aria-hidden="true" />
                </span>
              )}
              {hasError && (
                <span
                  className="aven-dropdown-error-icon"
                  aria-label="Error info"
                  tabIndex={0}
                >
                  <Info size={15} aria-hidden="true" />
                  <span
                    id={`${dropdownId}-error-tooltip`}
                    className="aven-dropdown-tooltip"
                    role="tooltip"
                  >
                    {error}
                  </span>
                </span>
              )}
              <ChevronDown
                size={16}
                className={cn(
                  'aven-dropdown-chevron',
                  isOpen && 'aven-dropdown-chevron--open',
                )}
                aria-hidden="true"
              />
            </span>
          </button>
        </div>

        {helperText && !hasError && (
          <p className="aven-dropdown-helper">{helperText}</p>
        )}

        {isOpen &&
          createPortal(
            <div
              ref={contentRef}
              className="aven-dropdown-content"
              style={contentStyle}
              role="listbox"
              aria-multiselectable={multiple}
              aria-label={label ?? placeholder}
            >
              {searchable && (
                <div className="aven-dropdown-search-wrapper">
                  <input
                    ref={searchRef}
                    type="text"
                    className="aven-dropdown-search"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setFocusedIndex(0)
                    }}
                  />
                </div>
              )}

              {loading ? (
                <div className="aven-dropdown-loading">
                  <Loader2 size={18} className="aven-dropdown-loader" aria-hidden="true" />
                  <span>Loading...</span>
                </div>
              ) : filteredOptions.length === 0 ? (
                <div className="aven-dropdown-empty">
                  {search ? 'No results found' : 'No options available'}
                </div>
              ) : (
                <ul ref={listRef} className="aven-dropdown-list">
                  {filteredOptions.map((option: DropdownOption, index: number) => {
                    const isSelected = selectedValues.includes(option.value)
                    const isFocused = focusedIndex === index

                    return (
                      <li
                        key={option.value}
                        className={cn(
                          'aven-dropdown-option',
                          isSelected && 'aven-dropdown-option--selected',
                          isFocused && 'aven-dropdown-option--focused',
                          option.disabled && 'aven-dropdown-option--disabled',
                        )}
                        role="option"
                        aria-selected={isSelected}
                        aria-disabled={option.disabled}
                        onClick={() => !option.disabled && handleSelect(option.value)}
                        onMouseEnter={() => !option.disabled && setFocusedIndex(index)}
                      >
                        {multiple && (
                          <span
                            className={cn(
                              'aven-dropdown-checkbox',
                              isSelected && 'aven-dropdown-checkbox--checked',
                            )}
                          >
                            {isSelected && <Check size={11} aria-hidden="true" />}
                          </span>
                        )}
                        <span className="aven-dropdown-option-label">{option.label}</span>
                        {!multiple && isSelected && (
                          <Check
                            size={14}
                            className="aven-dropdown-option-check"
                            aria-hidden="true"
                          />
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>,
            document.body,
          )}
      </div>
    )
  },
)

Dropdown.displayName = 'Dropdown'
