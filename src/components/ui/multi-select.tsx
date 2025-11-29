import * as React from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Badge } from '~/components/ui/badge';
import { Command, CommandGroup, CommandItem, CommandList } from '~/components/ui/command';

type Option = {
  value: string;
  label: string;
};

export type MultiSelectProps = {
  id?: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  'aria-invalid'?: boolean;
  className?: string;
};

export function MultiSelect({
  id,
  options,
  value,
  onChange,
  placeholder,
  'aria-invalid': ariaInvalid,
  className,
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            const newSelected = [...value];
            newSelected.pop();
            onChange(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === 'Escape') {
          input.blur();
        }
      }
    },
    [value, onChange],
  );

  const selectableOptions = options.filter((option) => !value.includes(option.value));

  return (
    <Command onKeyDown={handleKeyDown} className={cn('overflow-visible bg-transparent', className)}>
      <div
        className={cn(
          'group rounded-md border border-input px-3 py-2 text-sm dark:bg-input/30',
          'focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
          'has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40',
        )}
      >
        <div className='flex flex-wrap gap-1'>
          {value.map((v) => {
            return (
              <Badge key={v} variant='secondary'>
                {options.find((o) => o.value === v)?.label}
                <button
                  className='ml-1 rounded-full ring-offset-background outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(v);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(v)}
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            id={id}
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
            aria-invalid={ariaInvalid}
          />
        </div>
      </div>
      <div className='relative mt-2'>
        <CommandList>
          {open && selectableOptions.length > 0 ? (
            <div className='absolute top-0 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none'>
              <CommandGroup className='h-full overflow-auto'>
                {selectableOptions.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={() => {
                        setInputValue('');
                        onChange([...value, option.value]);
                      }}
                      className={'cursor-pointer'}
                    >
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}
