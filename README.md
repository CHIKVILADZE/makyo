# Makyo Select Dropdown Component


A modern, highly customizable, and accessible dropdown component for React applications with advanced features like search functionality, multiple selection, portal support, and beautiful animations.

## ✨ Features

- 🔍 **Searchable Dropdown** - Built-in search functionality to filter through options
- 🚪 **Portal Support** - Render dropdown outside component tree to avoid z-index issues
- 🎯 **Single/Multiple Selection** - Support for both single and multiple option selection
- 🎨 **Customizable Rendering** - Custom option rendering with icons and labels
- 🔧 **Toggle Features** - Enable/disable features like search, outline, etc.
- 📱 **Responsive Design** - Works perfectly on all screen sizes
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 🎭 **Beautiful Animations** - Smooth transitions and hover effects
- 📦 **Zero Dependencies** - Only requires React as peer dependency
- 🔧 **TypeScript** - Full TypeScript support with comprehensive types
- 🚀 **High Performance** - Optimized for large datasets

## 📦 Installation

```bash
npm install @makyo/select-dropdown
```

or

```bash
yarn add @makyo/select-dropdown
```

## 🚀 Quick Start

```tsx
import React, { useState } from 'react';
import { SelectDropdown, OptionType } from '@makyo/select-dropdown';

const options: OptionType[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', icon: <span>🔧</span> },
  { value: '3', label: 'Option 3', disabled: true },
];

function App() {
  const [value, setValue] = useState<OptionType | null>(null);

  return (
    <SelectDropdown
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Choose an option..."
      withSearch={true}
    />
  );
}
```

## 📚 Examples

### Basic Usage

```tsx
import { SelectDropdown } from '@makyo/select-dropdown';

<SelectDropdown
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'angular', label: 'Angular' }
  ]}
  placeholder="Select a framework..."
/>
```

### Multiple Selection

```tsx
<SelectDropdown
  options={options}
  multiple={true}
  placeholder="Select multiple options..."
  value={selectedValues}
  onChange={setSelectedValues}
/>
```

### With Icons and Custom Rendering

```tsx
const frameworkOptions = [
  { 
    value: 'react', 
    label: 'React', 
    icon: <ReactIcon className="w-4 h-4" /> 
  },
];

<SelectDropdown
  options={frameworkOptions}
  optionLabel={(option) => (
    <div className="flex items-center gap-3">
      {option.icon}
      <div>
        <div className="font-semibold">{option.label}</div>
        <div className="text-sm text-gray-500">JavaScript Framework</div>
      </div>
    </div>
  )}
/>
```

### Portal Rendering (Recommended for Modals)

```tsx
<SelectDropdown
  options={options}
  usePortal={true}
  zIndex={9999}
  placeholder="Rendered in portal..."
/>
```

### Search Disabled

```tsx
<SelectDropdown
  options={options}
  withSearch={false}
  placeholder="No search functionality..."
/>
```

### Custom Styling

```tsx
<SelectDropdown
  options={options}
  className="custom-dropdown"
  dropdownClassName="custom-dropdown-menu"
  outlined={false} // Removes border outline
/>
```

## 📖 API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `OptionType[]` | **Required** | Array of options to display |
| `value` | `OptionType \| OptionType[] \| null` | `null` | Selected value(s) |
| `onChange` | `(value: OptionType \| OptionType[] \| null) => void` | `undefined` | Callback when selection changes |
| `placeholder` | `string` | `"Select an option..."` | Placeholder text |
| `searchPlaceholder` | `string` | `"Search options..."` | Search input placeholder |
| `withSearch` | `boolean` | `true` | Enable search functionality |
| `multiple` | `boolean` | `false` | Allow multiple selections |
| `disabled` | `boolean` | `false` | Disable the component |
| `outlined` | `boolean` | `true` | Show border outline |
| `usePortal` | `boolean` | `false` | Render dropdown in portal |
| `zIndex` | `number` | `1000` | Z-index for dropdown |
| `maxHeight` | `number` | `300` | Maximum height of dropdown in pixels |
| `optionLabel` | `(option: OptionType) => React.ReactNode` | `undefined` | Custom option rendering function |
| `className` | `string` | `undefined` | Additional CSS classes for container |
| `dropdownClassName` | `string` | `undefined` | Additional CSS classes for dropdown |
| `id` | `string` | `"select-dropdown"` | Component ID |

### Types

#### OptionType

```tsx
interface OptionType {
  value: string | number;    // Unique identifier
  label: string;             // Display text
  icon?: React.ReactNode;    // Optional icon
  disabled?: boolean;        // Disable option
}
```

#### SelectDropdownProps

Full TypeScript interface available for comprehensive type safety.

## 🎨 Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. **Using className props:**
   ```tsx
   <SelectDropdown
     className="your-custom-class"
     dropdownClassName="your-dropdown-class"
   />
   ```



## ⌨️ Keyboard Navigation

- `↑` / `↓` - Navigate through options
- `Enter` - Select highlighted option
- `Escape` - Close dropdown
- `Tab` - Move focus to next element
- `Type` - Search through options (when search is enabled)

## 🔧 Advanced Usage

### Large Datasets

```tsx
const [options, setOptions] = useState([]);
const [loading, setLoading] = useState(false);

// Async data loading
useEffect(() => {
  setLoading(true);
  fetchOptions().then(data => {
    setOptions(data);
    setLoading(false);
  });
}, []);

<SelectDropdown
  options={options}
  placeholder={loading ? "Loading..." : "Select an option..."}
  disabled={loading}
/>
```

### Form Integration

```tsx
// With React Hook Form
import { useForm, Controller } from 'react-hook-form';

const { control } = useForm();

<Controller
  name="framework"
  control={control}
  render={({ field }) => (
    <SelectDropdown
      options={frameworkOptions}
      value={field.value}
      onChange={field.onChange}
    />
  )}
/>
```



## 📝 Dependencies

This component has minimal dependencies:

- `@floating-ui/react` - For positioning
- `clsx` - For conditional classes
- `tailwind-merge` - For merging Tailwind classes

**Peer Dependencies:**
- `react` >= 16.8.0
- `react-dom` >= 16.8.0

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start Storybook
npm run storybook

# Build library
npm run build:lib

# Build Storybook for deployment
npm run build-storybook

# Run tests
npm test




]




