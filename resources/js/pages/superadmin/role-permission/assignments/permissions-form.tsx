import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { PageSettingsType } from '@/types/page-settings';
import { useForm } from '@inertiajs/react';
import { IconCheck, IconSelector, IconX } from '@tabler/icons-react';
import { FormEventHandler } from 'react';
import RolePermissionLayout from '../role-permission-layout';
import AssignmentLayout from './assignment-layout';

type PermissionAssignmentType = {
    label: string;
    value: string;
};

type RoleAssignmentType = {
    id: number;
    label: string;
    value: string;
};

interface PermissionFormType {
    role: RoleAssignmentType;
    permission: PermissionAssignmentType;
    roles: RoleAssignmentType[];
    permissions: PermissionAssignmentType[];
    page_settings: PageSettingsType;
}

export default function PermissionsForm({ role, permission, roles, permissions, page_settings }: PermissionFormType) {
    const { data, setData, post, errors, processing, reset } = useForm({
        role: role ? role.id : '',
        permissions: permission?.value ? permission?.value : [],
        _method: page_settings.method,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(page_settings.url, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    return (
        <Card className='max-w-xl'>
            <CardHeader>
                <CardTitle>{page_settings.title}</CardTitle>
                <CardDescription>{page_settings.description}</CardDescription>
            </CardHeader>
            <CardContent className='w-full'>
                <form onSubmit={submit} method='post' className='w-full space-y-4'>
                    <div>
                        <Label htmlFor='roles' className='mb-2.5 block'>
                            Roles
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline' role='combobox' className='w-full justify-between'>
                                    {data.role
                                        ? roles.find((role: any) => role.id === data.role)?.label
                                        : 'Select role'}
                                    <IconSelector className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align='end' className='w-full p-0'>
                                <Command>
                                    <CommandInput placeholder='Search user...' name='role' id='role' className='h-9' />
                                    <CommandEmpty>No role found...</CommandEmpty>
                                    <CommandGroup className='simple-scrollbar h-52 overflow-y-auto'>
                                        {roles.map((role: RoleAssignmentType, i: number) => (
                                            <CommandItem
                                                value={role.value}
                                                key={i}
                                                onSelect={() => {
                                                    setData('role', role.id);
                                                }}>
                                                {role.label}
                                                <IconCheck
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        role.id === data.role ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.role} className='mt-0' />
                    </div>
                    <div>
                        <Label htmlFor='permissions' className='mb-2.5 block'>
                            Permissions
                        </Label>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline' role='combobox' className='w-full justify-between'>
                                    Permissions Selected : {data.permissions?.length}
                                    <IconSelector className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align='end' className='w-full p-0'>
                                <Command>
                                    <CommandInput
                                        placeholder='Search roles...'
                                        name='permissions'
                                        id='permissions'
                                        className='h-9'
                                    />
                                    <CommandEmpty>No permissions found...</CommandEmpty>
                                    <CommandGroup className='simple-scrollbar h-52 overflow-y-auto'>
                                        {permissions.map((permission, i: number) => (
                                            <CommandItem
                                                key={i}
                                                onSelect={() => {
                                                    // @ts-ignore
                                                    const isSelected = data.permissions.includes(permission.value);
                                                    if (isSelected) {
                                                        setData(
                                                            'permissions',
                                                            // @ts-ignore
                                                            data.permissions.filter((id) => id !== permission.value),
                                                        );
                                                    } else {
                                                        // @ts-ignore
                                                        setData('permissions', [...data.permissions, permission.value]);
                                                    }
                                                }}>
                                                <div className='flex items-center'>{permission.label}</div>
                                                <IconCheck
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        // @ts-ignore
                                                        data.permissions.includes(permission.value)
                                                            ? 'opacity-100'
                                                            : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                            {data.permissions?.length ? (
                                <small className='mt-2 flex flex-wrap items-center gap-1 text-xs'>
                                    {/*  @ts-ignore */}
                                    {data.permissions?.map((item, i: number) => (
                                        <div
                                            key={i}
                                            className='group flex select-none overflow-hidden rounded border bg-background'>
                                            <span className='px-2 py-1 font-medium text-foreground'>{item}</span>
                                            <button
                                                value={item}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setData(
                                                        'permissions',
                                                        // @ts-ignore
                                                        data.permissions.filter(
                                                            // @ts-ignore
                                                            (item) => item !== e.currentTarget.value,
                                                        ),
                                                    );
                                                }}
                                                className='px-2 py-1 font-bold text-muted-foreground hover:bg-accent focus:outline-none group-hover:bg-accent group-hover:text-foreground'>
                                                <IconX className='h-3 w-3' />
                                            </button>
                                        </div>
                                    ))}
                                </small>
                            ) : null}
                        </Popover>
                        <InputError message={errors.permissions} className='mt-0' />
                    </div>
                    <Button
                        type='submit'
                        disabled={data.role === undefined ? true : data.permissions.length === 0 ? true : processing}>
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

PermissionsForm.layout = (page: React.ReactNode) => (
    <AuthLayout title='Assign Role Permissions'>
        <RolePermissionLayout>
            <AssignmentLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
