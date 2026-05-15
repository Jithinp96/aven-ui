import React from 'react'

interface VisuallyHiddenProps {
  children: React.ReactNode
  className?: string
}

const style: React.CSSProperties = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
}

export function VisuallyHidden({ children, className }: VisuallyHiddenProps) {
  return (
    <span style={style} className={className}>
      {children}
    </span>
  )
}
