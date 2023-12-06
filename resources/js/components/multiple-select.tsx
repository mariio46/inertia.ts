import { cn } from '@/lib/utils';
import { Icon } from './icons';
import { Button } from './ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

type CollectionType = {
    value: string;
    label: string;
};

interface MultipleSelectProps {
    collections: CollectionType[];
    data: string[];
    setData: () => void;
    label?: string;
}

export default function MultipleSelect({ collections, data, setData, label = 'Data' }: MultipleSelectProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant='outline' role='combobox' className='w-full justify-between'>
                    {label} Selected : {data?.length}
                    <Icon name='IconSelector' className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-full p-0'>
                <Command>
                    <CommandInput placeholder={`Search ${label}...`} name='roles' id='roles' className='h-9' />
                    <CommandEmpty>No {label} found...</CommandEmpty>
                    <CommandGroup className='simple-scrollbar h-52 overflow-y-auto'>
                        {collections.map((item: any, i: number) => (
                            <CommandItem
                                key={i}
                                onSelect={() => {
                                    // @ts-ignore
                                    const isSelected = data.includes(item.value);
                                    if (isSelected) {
                                        setData(
                                            // @ts-ignore
                                            data.filter((id) => id !== item.value),
                                        );
                                    } else {
                                        // @ts-ignore
                                        setData([...data, item.value]);
                                    }
                                }}>
                                <div className='flex items-center'>{item.label}</div>
                                <Icon
                                    name='IconCheck'
                                    className={cn(
                                        'ml-auto h-4 w-4',
                                        // @ts-ignore
                                        data.includes(item.value) ? 'opacity-100' : 'opacity-0',
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
            {data?.length ? (
                <small className='mt-2 flex flex-wrap items-center gap-1 text-xs'>
                    {/*  @ts-ignore */}
                    {data?.map((item, i: number) => (
                        <div key={i} className='group flex select-none overflow-hidden rounded border bg-background'>
                            <span className='px-2 py-1 font-medium text-foreground'>{item}</span>
                            <button
                                value={item}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setData(
                                        // @ts-ignore
                                        data?.filter((item) => item !== e.currentTarget.value),
                                    );
                                }}
                                className='px-2 py-1 font-bold text-muted-foreground hover:bg-accent focus:outline-none group-hover:bg-accent group-hover:text-foreground'>
                                <Icon name='IconX' className='h-3 w-3' />
                            </button>
                        </div>
                    ))}
                </small>
            ) : null}
        </Popover>
    );
}
