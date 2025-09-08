import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectDropdown, type OptionType } from '../components/SelectDropdown';
import { useState } from 'react';

const meta: Meta<typeof SelectDropdown> = {
  title: 'Form/Select Dropdown Field',
  component: SelectDropdown,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A beautiful, searchable dropdown component with support for single and multiple selections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    withSearch: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    outlined: {
      control: 'boolean',
      description: 'Show border outline',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the component',
    },
    usePortal: {
      control: 'boolean',
      description: 'Render dropdown in portal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockOptions: OptionType[] = [
  { value: '1', label: 'Option 1' },
  { 
    value: '2', 
    label: 'Option with icon', 
    icon: <span className="text-blue-500">🔧</span> 
  },
  { value: '3', label: 'Long Long Option 3' },
  { value: '4', label: 'Long Long Long Option 4' },
  { value: '5', label: 'Long Long Long Long Option 5' },
  { value: '6', label: 'Long Long Long Long Long Option 6' },
  { 
    value: '7', 
    label: 'Disabled Option', 
    disabled: true 
  },
];

const SelectDropdownWithState = (args: any) => {
  const [value, setValue] = useState<OptionType | OptionType[] | null>(null);
  
  return (
    <div className="w-80 space-y-4">
      <div>
        <label htmlFor={args.id} className="block text-sm font-medium text-gray-700 mb-2">
          Label
        </label>
        <SelectDropdown
          {...args}
          value={value}
          onChange={setValue}
          options={mockOptions}
        />
      </div>
      
      {value && (
        <div className="p-3 bg-gray-50 rounded-md text-xs text-gray-600">
          <div className="font-medium mb-1">Selected:</div>
          <pre className="whitespace-pre-wrap text-xs overflow-hidden">
            {JSON.stringify(value, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export const Default: Story = {
  render: SelectDropdownWithState,
  args: {
    id: 'sdd-1',
    withSearch: true,
    multiple: false,
    outlined: true,
    placeholder: 'Select an option...',
  },
};

export const MultipleSelection: Story = {
  render: SelectDropdownWithState,
  args: {
    id: 'sdd-multiple',
    withSearch: true,
    multiple: true,
    outlined: true,
    placeholder: 'Select multiple options...',
  },
};

export const WithoutSearch: Story = {
  render: SelectDropdownWithState,
  args: {
    id: 'sdd-no-search',
    withSearch: false,
    multiple: false,
    outlined: true,
    placeholder: 'No search functionality...',
  },
};

export const WithoutOutline: Story = {
  render: SelectDropdownWithState,
  args: {
    id: 'sdd-no-outline',
    withSearch: true,
    multiple: false,
    outlined: false,
    placeholder: 'Underline style...',
  },
};

export const WithPortal: Story = {
  render: SelectDropdownWithState,
  args: {
    id: 'sdd-portal',
    withSearch: true,
    multiple: false,
    outlined: true,
    usePortal: true,
    zIndex: 9999,
    placeholder: 'Rendered in portal...',
  },
};

export const Disabled: Story = {
  render: SelectDropdownWithState,
  args: {
    id: 'sdd-disabled',
    withSearch: true,
    multiple: false,
    outlined: true,
    disabled: true,
    placeholder: 'Disabled state...',
  },
};