import React, { useState, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useRole,
  useDismiss,
  useListNavigation,
  useInteractions,
  FloatingFocusManager,
  useClick,
  size,
} from '@floating-ui/react';
import { ChevronDownIcon, XMarkIcon, MagnifyingGlassIcon, CheckIcon } from './icons';
import { cn } from '../../utils/cn';
import type { OptionType } from './types';
import type { SelectDropdownProps } from './types';

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option...',
  searchPlaceholder = 'Search options...',
  withSearch = true,
  multiple = false,
  disabled = false,
  outlined = true,
  optionLabel,
  className,
  dropdownClassName,
  usePortal = false,
  zIndex = 1000,
  maxHeight = 300,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const listRef = useRef<Array<HTMLElement | null>>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(8),
      flip({ padding: 16 }),
      shift({ padding: 16 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            minWidth: `${rects.reference.width}px`,
            maxHeight: `${maxHeight}px`,
          });
        },
      }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
  ]);

  const filteredOptions = useMemo(() => {
    if (!withSearch || !searchQuery.trim()) {
      return options;
    }
    return options.filter(option =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery, withSearch]);

  const selectedOptions = useMemo(() => {
    if (!value) {
      return [];
    }
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const handleOptionSelect = (option: OptionType) => {
    if (option.disabled) {
      return;
    }

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const isSelected = currentValues.some(v => v.value === option.value);
      
      let newValues;
      if (isSelected) {
        newValues = currentValues.filter(v => v.value !== option.value);
      } else {
        newValues = [...currentValues, option];
      }
      
      const finalValue = newValues.length > 0 ? newValues : null;
      if (onChange) {
        onChange(finalValue);
      }
    } else {
      if (onChange) {
        onChange(option);
      }
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  const handleRemoveOption = (optionToRemove: OptionType, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.filter(v => v.value !== optionToRemove.value);
      const finalValue = newValues.length > 0 ? newValues : null;
      if (onChange) {
        onChange(finalValue);
      }
    } else {
      if (onChange) {
        onChange(null);
      }
    }
  };

  const renderSelectedValue = () => {
    if (selectedOptions.length === 0) {
      return (
        <span className="text-gray-400 text-sm font-medium">
          {placeholder}
        </span>
      );
    }

    if (multiple) {
      if (selectedOptions.length === 1) {
        const selected = selectedOptions[0];
        return (
          <div className="flex items-center gap-2">
            {selected.icon && (
              <span className="text-blue-500 text-sm">
                {selected.icon}
              </span>
            )}
            <span className="text-gray-900 text-sm font-medium">
              {selected.label}
            </span>
            <button
              type="button"
              onClick={(e) => handleRemoveOption(selected, e)}
              className="ml-auto text-white hover:text-red-100 transition-colors duration-200 rounded-full p-1.5 bg-red-500 hover:bg-red-600 shadow-sm"
            >
              <XMarkIcon className="h-3 w-3" />
            </button>
          </div>
        );
      }
      
      return (
        <div className="flex items-center gap-2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {selectedOptions.length} selected
          </span>
        </div>
      );
    }

    const selected = selectedOptions[0];
    return (
      <div className="flex items-center gap-2">
        {selected.icon && (
          <span className="text-blue-500 text-sm">
            {selected.icon}
          </span>
        )}
        <span className="text-gray-900 text-sm font-medium">
          {selected.label}
        </span>
      </div>
    );
  };

  const renderOption = (option: OptionType, index: number) => {
    const isSelected = selectedOptions.some(v => v.value === option.value);
    const isActive = index === activeIndex;

    const optionContent = optionLabel ? optionLabel(option) : (
      <div className="flex items-center gap-3">
        {option.icon && (
          <span className="text-blue-500 text-sm">
            {option.icon}
          </span>
        )}
        <span className="text-gray-900 text-sm font-medium">
          {option.label}
        </span>
      </div>
    );

    return (
      <div
        key={option.value}
        ref={(node) => {
          listRef.current[index] = node;
        }}
        role="option"
        aria-selected={isSelected}
        className={cn(
          'px-4 py-3 cursor-pointer transition-all duration-200 text-left group',
          'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50',
          isActive && 'bg-gradient-to-r from-blue-50 to-purple-50',
          isSelected && !multiple && 'bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 shadow-sm',
          isSelected && multiple && 'bg-gradient-to-r from-green-50 to-emerald-50',
          option.disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent text-gray-400'
        )}
        onClick={() => handleOptionSelect(option)}
        {...getItemProps({
          onClick() {
            handleOptionSelect(option);
          },
        })}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 min-w-0">
            {optionContent}
          </div>
          {multiple && isSelected && (
            <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center ml-3 flex-shrink-0 shadow-md">
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
          )}
          {!multiple && isSelected && (
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center ml-3 flex-shrink-0 shadow-md">
              <CheckIcon className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const dropdown = isOpen && (
    <FloatingFocusManager context={context} modal={false}>
      <div
        ref={refs.setFloating}
        style={{ ...floatingStyles, zIndex }}
        className={cn(
          'bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm',
          'min-w-0 max-w-sm animate-in fade-in-0 zoom-in-95 duration-200',
          dropdownClassName
        )}
        {...getFloatingProps()}
      >
        {withSearch && (
          <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-gray-100">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-sm">
                  <MagnifyingGlassIcon className="h-3 w-3 text-white" />
                </div>
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 pr-12 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-medium shadow-sm transition-all duration-200"
              />
              {searchQuery && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-sm hover:from-red-500 hover:to-red-600 transition-all duration-200"
                  >
                    <XMarkIcon className="h-3 w-3 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {filteredOptions.length === 0 ? (
            <div className="px-4 py-8 text-center">
              <div className="text-gray-400 text-sm font-medium">
                {searchQuery ? 'No options found' : 'No options available'}
              </div>
              {searchQuery && (
                <div className="text-xs text-gray-400 mt-2">
                  Try adjusting your search terms
                </div>
              )}
            </div>
          ) : (
            <div className="py-2">
              {filteredOptions.map((option, index) => renderOption(option, index))}
            </div>
          )}
        </div>
      </div>
    </FloatingFocusManager>
  );

  return (
    <div className={cn('relative w-full', className)}>
      <button
        ref={refs.setReference}
        type="button"
        disabled={disabled}
        className={cn(
          'relative w-full bg-white border-2 border-gray-200 rounded-lg shadow-sm pl-4 pr-12 py-3 text-left cursor-default focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300 hover:shadow-md',
          !outlined && 'border-0 border-b-2 border-gray-200 rounded-none shadow-none hover:border-gray-300',
          disabled && 'opacity-50 cursor-not-allowed bg-gray-50',
          isOpen && 'ring-2 ring-blue-500 border-blue-500 shadow-lg'
        )}
        {...getReferenceProps()}
      >
        <span className="block truncate">
          {renderSelectedValue()}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center shadow-sm transition-all duration-200',
            isOpen 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600' 
              : 'bg-gradient-to-r from-gray-400 to-gray-500'
          )}>
            <ChevronDownIcon
              className={cn(
                'h-3 w-3 text-white transition-all duration-200',
                isOpen && 'transform rotate-180'
              )}
            />
          </div>
        </span>
      </button>

      {usePortal ? createPortal(dropdown, document.body) : dropdown}
    </div>
  );
};