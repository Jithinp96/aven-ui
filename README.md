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

### TextArea

A multiline text input with the same label, helper text, and error tooltip behaviour as `Input`. The error info icon is anchored to the top-right corner of the textarea.

```tsx
import { TextArea } from 'aven-ui'
```

#### Basic usage

```tsx
<TextArea placeholder="Write something..." />
```

#### With label and helper text

```tsx
<TextArea
  label="Bio"
  placeholder="Tell us about yourself..."
  helperText="Maximum 500 characters."
/>
```

#### Error state

Same behaviour as Input — red border, info icon top-right, hover to see the message.

```tsx
<TextArea
  label="Description"
  error="Description must be at least 20 characters."
/>
```

#### Resize control

```tsx
<TextArea resize="none" />       {/* fixed size */}
<TextArea resize="vertical" />   {/* default */}
<TextArea resize="horizontal" />
<TextArea resize="both" />
```

#### Rows

```tsx
<TextArea rows={6} label="Message" />
```

#### Sizes

```tsx
<TextArea size="sm" label="Small" />
<TextArea size="md" label="Medium" />  {/* default */}
<TextArea size="lg" label="Large" />
```

#### With React Hook Form

```tsx
const { register, formState: { errors } } = useForm()

<TextArea
  label="Message"
  error={errors.message?.message}
  {...register('message')}
/>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Label rendered above the textarea |
| `error` | `string` | — | Error message — triggers red border and hover tooltip |
| `helperText` | `string` | — | Helper text below textarea (hidden when `error` is set) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Font size and padding |
| `resize` | `'none' \| 'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | CSS resize behaviour |
| `fullWidth` | `boolean` | `false` | Stretches to fill container |
| `disabled` | `boolean` | `false` | Disables the textarea |
| `rows` | `number` | — | Number of visible text rows |
| `className` | `string` | — | Additional CSS classes on the `<textarea>` element |

All standard HTML `<textarea>` attributes are accepted and forwarded.

---

### Dropdown

A fully featured select component with single and multi-select, search/filter, clearable selection, loading state, disabled options, and the same error tooltip pattern as Input and TextArea.

```tsx
import { Dropdown } from 'aven-ui'
```

#### Basic usage

```tsx
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

<Dropdown options={options} label="Fruit" placeholder="Select a fruit..." />
```

#### Error state

```tsx
<Dropdown
  options={options}
  label="Fruit"
  error="Please select a fruit to continue."
/>
```

#### With helper text

```tsx
<Dropdown
  options={options}
  label="Favourite fruit"
  helperText="We use this to personalise your experience."
/>
```

#### Searchable

Adds a search input at the top of the list to filter options by label.

```tsx
<Dropdown options={options} label="Fruit" searchable placeholder="Search and select..." />
```

#### Clearable

Shows an × button inside the trigger when a value is selected.

```tsx
<Dropdown options={options} label="Fruit" clearable defaultValue="apple" />
```

#### Multi-select

```tsx
<Dropdown
  options={options}
  label="Favourite fruits"
  multiple
  placeholder="Select multiple..."
/>
```

Multi-select + search + clearable:

```tsx
<Dropdown
  options={options}
  label="Favourite fruits"
  multiple
  searchable
  clearable
/>
```

#### Disabled options

Set `disabled: true` on any option to prevent it from being selected.

```tsx
const options = [
  { label: 'Apple', value: 'apple' },
  { label: 'Durian (unavailable)', value: 'durian', disabled: true },
]
```

#### Loading state

While options are being fetched, pass `loading` to show a spinner and block the list.

```tsx
<Dropdown options={[]} label="Fruit" loading placeholder="Loading options..." />
```

#### Sizes

```tsx
<Dropdown options={options} size="sm" label="Small" />
<Dropdown options={options} size="md" label="Medium" />  {/* default */}
<Dropdown options={options} size="lg" label="Large" />
```

#### Full width

```tsx
<Dropdown options={options} label="Fruit" fullWidth />
```

#### Controlled

```tsx
const [value, setValue] = useState('')

<Dropdown
  options={options}
  label="Fruit"
  value={value}
  onChange={(v) => setValue(v as string)}
  clearable
/>
```

#### Controlled multi-select

```tsx
const [value, setValue] = useState<string[]>([])

<Dropdown
  options={options}
  label="Fruits"
  multiple
  searchable
  clearable
  value={value}
  onChange={(v) => setValue(v as string[])}
/>
```

#### With React Hook Form

```tsx
const { setValue, watch, formState: { errors } } = useForm()
const fruit = watch('fruit')

<Dropdown
  options={options}
  label="Fruit"
  value={fruit ?? ''}
  onChange={(v) => setValue('fruit', v as string)}
  error={errors.fruit?.message}
/>
```

#### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `DropdownOption[]` | `[]` | The list of options to display |
| `value` | `string \| string[]` | — | Controlled value |
| `defaultValue` | `string \| string[]` | — | Uncontrolled initial value |
| `onChange` | `(value: string \| string[]) => void` | — | Called when the selection changes |
| `label` | `string` | — | Label rendered above the trigger |
| `placeholder` | `string` | `'Select...'` | Placeholder shown when nothing is selected |
| `error` | `string` | — | Error message — triggers red border and hover tooltip |
| `helperText` | `string` | — | Helper text below trigger (hidden when `error` is set) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Trigger height and font size |
| `multiple` | `boolean` | `false` | Enables multi-select with checkboxes |
| `searchable` | `boolean` | `false` | Adds a search input to filter options |
| `clearable` | `boolean` | `false` | Shows a clear (×) button when a value is selected |
| `loading` | `boolean` | `false` | Shows a spinner instead of the options list |
| `disabled` | `boolean` | `false` | Disables the trigger |
| `fullWidth` | `boolean` | `false` | Stretches the trigger to fill its container |
| `maxHeight` | `number` | `240` | Max height (px) of the options panel |
| `id` | `string` | — | Overrides the auto-generated `id` |
| `className` | `string` | — | Additional CSS classes on the root element |

**`DropdownOption`**

| Field | Type | Description |
|---|---|---|
| `label` | `string` | Display text |
| `value` | `string` | Value passed to `onChange` |
| `disabled` | `boolean` | Prevents selection when `true` |

---

### Toast

An imperative notification system. Trigger toasts from anywhere in your app without passing props. Supports success, error, warning, and info types, auto-dismiss, pause-on-hover, and configurable position.

#### Setup

Wrap your app root with `<ToastProvider>` and place `<Toaster>` inside it. Both can go in your root layout — you only need them once.

```tsx
import { ToastProvider, Toaster } from 'aven-ui'

function App() {
  return (
    <ToastProvider>
      <YourApp />
      <Toaster />
    </ToastProvider>
  )
}
```

**Next.js App Router**
```tsx
// app/layout.tsx
import { ToastProvider, Toaster } from 'aven-ui'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ToastProvider>
          {children}
          <Toaster />
        </ToastProvider>
      </body>
    </html>
  )
}
```

#### Usage

```tsx
import { useToast } from 'aven-ui'

function SaveButton() {
  const { toast } = useToast()

  const handleSave = async () => {
    try {
      await save()
      toast.success('Changes saved.')
    } catch {
      toast.error('Failed to save. Please try again.')
    }
  }

  return <button onClick={handleSave}>Save</button>
}
```

#### Toast types

```tsx
toast.success('Profile updated.')
toast.error('Something went wrong.')   // persistent by default — stays until dismissed
toast.warning('Your session expires in 5 minutes.')
toast.info('A new version is available.')
toast.show('Generic notification.')
```

#### With title

```tsx
toast.success('Your file has been uploaded.', { title: 'Upload complete' })
toast.error('Check the error logs for details.', { title: 'Deployment failed' })
```

#### Custom duration

```tsx
toast.success('Quick flash', { duration: 1500 })  // 1.5 seconds
toast.info('Long notice', { duration: 8000 })      // 8 seconds
toast.warning('Stays until dismissed', { duration: 0 })  // persistent
```

> Toasts auto-dismiss after **4 seconds** by default. Error toasts are **persistent by default** — the user must dismiss them manually.

#### Pause on hover

Hovering over a toast pauses its auto-dismiss timer. The timer resumes when the cursor leaves with the remaining time preserved.

#### Programmatic dismiss

```tsx
const { toast } = useToast()
const id = toast.info('Processing...')

// later
toast.dismiss(id)
```

#### Toaster position

```tsx
<Toaster position="bottom-right" />  {/* default */}
<Toaster position="bottom-left" />
<Toaster position="bottom-center" />
<Toaster position="top-right" />
<Toaster position="top-left" />
<Toaster position="top-center" />
```

#### Limit visible toasts

```tsx
<Toaster maxToasts={3} />  {/* show at most 3 at a time — default is 5 */}
```

#### Props — `<Toaster>`

| Prop | Type | Default | Description |
|---|---|---|---|
| `position` | `ToastPosition` | `'bottom-right'` | Where toasts appear on screen |
| `maxToasts` | `number` | `5` | Maximum number of toasts shown simultaneously |

#### `useToast` API

`useToast()` returns `{ toast }` with the following methods:

| Method | Signature | Default duration | Description |
|---|---|---|---|
| `toast.success` | `(message, options?) => id` | 4 s | Success notification |
| `toast.error` | `(message, options?) => id` | persistent | Error notification |
| `toast.warning` | `(message, options?) => id` | 4 s | Warning notification |
| `toast.info` | `(message, options?) => id` | 4 s | Informational notification |
| `toast.show` | `(message, options?) => id` | 4 s | Default style notification |
| `toast.dismiss` | `(id: string) => void` | — | Remove a toast by ID |

**`ToastOptions`**

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Optional bold title above the message |
| `duration` | `number` | Auto-dismiss delay in ms. `0` = persistent |

---

## License

MIT
