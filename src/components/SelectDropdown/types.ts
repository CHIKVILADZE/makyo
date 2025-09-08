export interface OptionType {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SelectDropdownProps {
  id?: string;
  options: OptionType[];
  value?: OptionType | OptionType[] | null;
  onChange?: (value: OptionType | OptionType[] | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  withSearch?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  outlined?: boolean;
  optionLabel?: (option: OptionType) => React.ReactNode;
  className?: string;
  dropdownClassName?: string;
  usePortal?: boolean;
  zIndex?: number;
  maxHeight?: number;
}