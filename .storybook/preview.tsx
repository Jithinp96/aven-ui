import type { Preview } from '@storybook/react-vite'
import { useEffect } from 'react'
import '../src/styles/index.css'

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Global color theme',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
          { value: 'auto', title: 'Auto (OS)', icon: 'lightning' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals['theme'] as string) ?? 'light'

      useEffect(() => {
        const root = document.documentElement
        const body = document.body
        if (theme === 'auto') {
          root.removeAttribute('data-theme')
          body.style.removeProperty('background-color')
        } else {
          root.setAttribute('data-theme', theme)
          body.style.backgroundColor = theme === 'dark' ? '#0f172a' : '#ffffff'
        }
        return () => {
          root.removeAttribute('data-theme')
          body.style.removeProperty('background-color')
        }
      }, [theme])

      const bgColor =
        theme === 'dark' ? '#0f172a' : theme === 'light' ? '#ffffff' : 'transparent'

      return (
        <div
          style={{
            background: bgColor,
            minHeight: '100vh',
            transition: 'background 200ms ease',
          }}
        >
          <Story />
        </div>
      )
    },
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
