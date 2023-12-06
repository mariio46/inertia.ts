import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { IconX } from '@tabler/icons-react';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useRef, useState } from 'react';

// type Framework = Record<'value' | 'label', string>;
type Collection = {
    value: string;
    label: string;
};

export function FancyMultiSelect({ collections }: { collections: Collection[] }) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Collection[]>([]);
    const [inputValue, setInputValue] = useState('');

    const handleUnselect = useCallback((framework: Collection) => {
        setSelected((prev) => prev.filter((s) => s.value !== framework.value));
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === 'Delete' || e.key === 'Backspace') {
                if (input.value === '') {
                    setSelected((prev) => {
                        const newSelected = [...prev];
                        newSelected.pop();
                        return newSelected;
                    });
                }
            }
            // This is not a default behaviour of the <input /> field
            if (e.key === 'Escape') {
                input.blur();
            }
        }
    }, []);

    const selectables = collections.filter((item) => !selected.includes(item));

    return (
        <Command onKeyDown={handleKeyDown} className='overflow-visible bg-transparent'>
            <div className='group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                <div className='flex flex-wrap gap-1'>
                    {selected.map((item) => {
                        return (
                            <Badge key={item.value} variant='secondary'>
                                {item.label}
                                <button
                                    className='ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleUnselect(item);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(item)}>
                                    <IconX className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                                </button>
                            </Badge>
                        );
                    })}
                    {/* Avoid having the "Search" Icon */}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder='Select frameworks...'
                        className='ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground'
                    />
                </div>
            </div>
            <div className='relative mt-2'>
                {open && selectables.length > 0 ? (
                    <div className='absolute bottom-14 right-0 z-10 w-52 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
                        <CommandGroup className='simple-scrollbar h-auto w-52 overflow-y-auto'>
                            {selectables.map((item) => {
                                return (
                                    <CommandItem
                                        key={item.value}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={(e) => {
                                            setInputValue('');
                                            setSelected((prev) => [...prev, item]);
                                        }}
                                        className={'cursor-pointer'}>
                                        {item.label}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </div>
                ) : null}
            </div>
        </Command>
    );
}
