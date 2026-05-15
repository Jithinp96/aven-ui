# aven-ui

A highly customizable, accessible React UI component library. Zero UI library dependencies — every component is built from scratch.

[![npm version](https://img.shields.io/npm/v/aven-ui)](https://www.npmjs.com/package/aven-ui)
[![license](https://img.shields.io/npm/l/aven-ui)](./LICENSE)

---

## Features

- **Fully customizable** — override any design token via CSS variables
- **Zero UI dependencies** — no Radix, no MUI, no Headless UI
- **TypeScript first** — every prop is fully typed with autocomplete
- **Accessible** — keyboard navigation, focus management, and ARIA built in
- **Tree-shakeable** — only the components you use end up in your bundle
- **React ecosystem** — works with React, Next.js, Remix, and Gatsby

---

## Requirements

- React 18 or higher
- React DOM 18 or higher

---

## Installation

```bash
npm install aven-ui
```

```bash
yarn add aven-ui
```

```bash
pnpm add aven-ui
```

---

## Setup

Import the stylesheet **once** at the root of your app. This loads the design tokens and component styles.

**React / Vite**
```tsx
// main.tsx
import 'aven-ui/styles'
```

**Next.js App Router**
```tsx
// app/layout.tsx
import 'aven-ui/styles'
```

**Next.js Pages Router**
```tsx
// pages/_app.tsx
import 'aven-ui/styles'
```

---

## Theming

`aven-ui` uses CSS custom properties (variables) for all design values. Override them once at your app root to theme the entire library.

```css
/* your-app.css */
:root {
  /* Brand color */
  --aven-color-primary: #e11d48;
  --aven-color-primary-hover: #be123c;
  --aven-color-primary-active: #9f1239;

  /* Shape */
  --aven-radius-md: 2px;   /* flat / sharp */
  --aven-radius-full: 4px;

  /* Typography */
  --aven-font-sans: 'Inter', sans-serif;
}
```

**Dark mode** is just another variable override:

```css
[data-theme='dark'] {
  --aven-color-bg: #0f172a;
  --aven-color-text: #f8fafc;
  --aven-color-border: #1e293b;
}
```

### Available tokens

| Token | Default | Description |
|---|---|---|
| `--aven-color-primary` | `#6366f1` | Primary brand color |
| `--aven-color-primary-hover` | `#4f46e5` | Primary hover state |
| `--aven-color-primary-active` | `#4338ca` | Primary active/pressed state |
| `--aven-color-primary-foreground` | `#ffffff` | Text on primary background |
| `--aven-color-danger` | `#ef4444` | Danger / destructive actions |
| `--aven-color-warning` | `#f59e0b` | Warning state |
| `--aven-color-success` | `#22c55e` | Success state |
| `--aven-color-text` | `#0f172a` | Default text color |
| `--aven-color-text-muted` | `#64748b` | Secondary text |
| `--aven-color-bg` | `#ffffff` | Page background |
| `--aven-color-border` | `#e2e8f0` | Default border color |
| `--aven-radius-sm` | `0.25rem` | Small border radius |
| `--aven-radius-md` | `0.375rem` | Default border radius |
| `--aven-radius-lg` | `0.5rem` | Large border radius |
| `--aven-radius-full` | `9999px` | Pill / fully rounded |
| `--aven-font-sans` | `system-ui, sans-serif` | Default font family |
| `--aven-font-mono` | `ui-monospace, monospace` | Monospace font family |
| `--aven-duration-normal` | `150ms` | Default transition duration |

---

## Components

### Button

A flexible button component with multiple intents, sizes, and shapes. Supports loading state, disabled state, ref forwarding, and rendering as any element via `asChild`.

```tsx
import { Button } from 'aven-ui'
```

#### Basic usage

```tsx
<Button>Default</Button>
<Button intent="primary">Primary</Button>
<Button intent="danger">Delete</Button>
<Button intent="ghost">Ghost</Button>
<Button intent="outline">Outline</Button>
```

#### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>   {/* default */}
<Button size="lg">Large</Button>
```

#### Shapes

```tsx
<Button shape="default">Default</Button>
<Button shape="pill">Pill</Button>
<Button shape="square">Square</Button>
```

#### Loading state

Shows a spinner and disables interaction while an async operation is in progress.

```tsx
<Button intent="primary" loading>Saving...</Button>
```

#### Disabled

```tsx
<Button disabled>Unavailable</Button>
```

#### As a link

Use the `asChild` prop to render the button's styles on a child element. Props and event handlers are merged onto the child.

```tsx
<Button intent="primary" asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>
```

#### Icon button

For buttons with only an icon, provide `aria-label` for screen readers.

```tsx
<Button size="sm" shape="square" aria-label="Delete item">
  <TrashIcon />
</Button>
```

#### Icon + label

```tsx
<Button intent="primary">
  <PlusIcon />
  Add item
</Button>
```

#### Form submit

```tsx
<Button type="submit" intent="primary">Submit</Button>
```

#### Ref forwarding

```tsx
const ref = useRef<HTMLButtonElement>(null)

<Button ref={ref} intent="primary">Click</Button>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `'default' \| 'primary' \| 'danger' \| 'ghost' \| 'outline'` | `'default'` | Visual style and color |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and font size |
| `shape` | `'default' \| 'pill' \| 'square'` | `'default'` | Border radius |
| `loading` | `boolean` | `false` | Shows spinner, disables interaction |
| `asChild` | `boolean` | `false` | Merges props onto the child element |
| `disabled` | `boolean` | `false` | Disables the button |
| `className` | `string` | — | Additional CSS classes |
| `style` | `CSSProperties` | — | Inline style override |
| `onClick` | `MouseEventHandler` | — | Click handler |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `aria-label` | `string` | — | Accessible label (required for icon-only buttons) |

All standard HTML `<button>` attributes are also accepted and forwarded.

#### Per-instance token override

You can override a design token on a single button instance using `style`:

```tsx
<Button
  intent="primary"
  style={{ '--aven-color-primary': '#e11d48' } as React.CSSProperties}
>
  Custom Red
</Button>
```

---

### Input

A text input component with label, helper text, error state with tooltip, prefix/suffix slots, and full ref forwarding.

```tsx
import { Input } from 'aven-ui'
```

#### Basic usage

```tsx
<Input placeholder="Enter your email" />
```

#### With label and helper text

```tsx
<Input
  label="Email address"
  placeholder="you@example.com"
  helperText="We will never share your email."
/>
```

#### Error state

Pass an error message via the `error` prop. This turns the border red and shows an info icon on the right. Hovering the icon reveals the error message in a tooltip.

```tsx
<Input
  label="Email address"
  placeholder="you@example.com"
  error="Please enter a valid email address."
/>
```

#### Sizes

```tsx
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium" />   {/* default */}
<Input size="lg" placeholder="Large" />
```

#### Prefix and suffix

```tsx
<Input prefix={<SearchIcon size={16} />} placeholder="Search..." />
<Input suffix={<CalendarIcon size={16} />} placeholder="Pick a date" />
```

> When `error` is set, the error info icon replaces the suffix automatically.

#### Full width

```tsx
<Input fullWidth label="Full name" placeholder="John Doe" />
```

#### Disabled

```tsx
<Input disabled label="Read only field" value="Cannot edit" />
```

#### With React Hook Form

```tsx
const { register, formState: { errors } } = useForm()

<Input
  label="Email"
  placeholder="you@example.com"
  error={errors.email?.message}
  {...register('email')}
/>
```

#### Ref forwarding

```tsx
const ref = useRef<HTMLInputElement>(null)

<Input ref={ref} label="Focus me" />
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label rendered above the input |
| `error` | `string` | — | Error message — triggers red border and hover tooltip |
| `helperText` | `string` | — | Helper text below input (hidden when `error` is set) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Height and font size |
| `prefix` | `ReactNode` | — | Node rendered on the left side |
| `suffix` | `ReactNode` | — | Node rendered on the right side (replaced by error icon when `error` is set) |
| `fullWidth` | `boolean` | `false` | Stretches input to fill its container |
| `disabled` | `boolean` | `false` | Disables the input |
| `className` | `string` | — | Additional CSS classes on the `<input>` element |
| `style` | `CSSProperties` | — | Inline style override |

All standard HTML `<input>` attributes (`onChange`, `onBlur`, `type`, `value`, `defaultValue`, `name`, `required`, `maxLength`, etc.) are accepted and forwarded. `size` and `prefix` from the native HTML spec are omitted in favour of the aven-ui versions above.

---

## License

MIT
