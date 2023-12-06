import { cn } from '@/lib/utils';
import { Icon } from './icons';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type Collection = {
    value: string;
    label: string;
};

interface PopoverSelectProps {
    collections: Collection[];
    data: string;
    setData: (data: string) => void;
    label?: string;
}

export default function PopoverSelect({ collections, data, setData, label = 'Data' }: PopoverSelectProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' role='combobox' className='w-full justify-between'>
                    {data ? collections.find((user) => user.value === data)?.label : `Select ${label}`}
                    <Icon name='IconSelector' className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-full p-0'>
                <Command>
                    <CommandInput placeholder={`Search ${label}...`} name='user' id='user' className='h-9' />
                    <CommandEmpty>No {label} found...</CommandEmpty>
                    <CommandGroup className='simple-scrollbar h-52 overflow-y-auto'>
                        {collections.map((item, i: number) => (
                            <CommandItem
                                value={item.value}
                                key={i}
                                onSelect={() => {
                                    setData(item.value);
                                }}>
                                {item.label}
                                <Icon
                                    name='IconCheck'
                                    className={cn('ml-auto h-4 w-4', item.value === data ? 'opacity-100' : 'opacity-0')}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
