import InputError from '@/components/input-error';
import SelectMultiples from '@/components/select-multiples';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { PageSettingsType } from '@/types/page-settings';
import { useForm } from '@inertiajs/react';
import { IconCheck, IconSelector } from '@tabler/icons-react';
import { FormEventHandler } from 'react';
import RolePermissionLayout from '../role-permission-layout';
import AssignmentLayout from './assignment-layout';

type UserAssignmentType = {
    value: string;
    label: string;
};

type RoleAssignmentType = {
    value: string;
    label: string;
};

interface RoleFormType {
    user: UserAssignmentType;
    role: RoleAssignmentType;
    users: UserAssignmentType[];
    roles: RoleAssignmentType[];
    page_settings: PageSettingsType;
}

export default function RolesForm({ user, role, users, roles, page_settings }: RoleFormType) {
    const { data, setData, post, errors, processing, reset } = useForm({
        user: user ? user?.value : '',
        roles: role ? role?.value : [],
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
                        <Label htmlFor='user' className='mb-2.5 block'>
                            User
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant='outline' role='combobox' className='w-full justify-between'>
                                    {data.user ? users.find((user) => user.value === data.user)?.label : 'Select user'}
                                    <IconSelector className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align='end' className='w-full p-0'>
                                <Command>
                                    <CommandInput placeholder='Search user...' name='user' id='user' className='h-9' />
                                    <CommandEmpty>No user found...</CommandEmpty>
                                    <CommandGroup className='simple-scrollbar h-52 overflow-y-auto'>
                                        {users.map((user, i: number) => (
                                            <CommandItem
                                                value={user.value}
                                                key={i}
                                                onSelect={() => {
                                                    setData('user', user.value);
                                                }}>
                                                {user.label}
                                                <IconCheck
                                                    className={cn(
                                                        'ml-auto h-4 w-4',
                                                        user.value === data.user ? 'opacity-100' : 'opacity-0',
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        <InputError message={errors.user} className='mt-0' />
                    </div>
                    <div>
                        <Label htmlFor='roles' className='mb-2.5 block'>
                            Roles
                        </Label>
                        <SelectMultiples
                            data={roles}
                            selectedItem={data.roles}
                            onChange={(e: any) => setData('roles', e)}
                            label='Role'
                        />
                        <InputError message={errors.roles} className='mt-0' />
                    </div>
                    <Button
                        type='submit'
                        disabled={data.user === undefined ? true : data.roles === undefined ? true : processing}>
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

RolesForm.layout = (page: React.ReactNode) => (
    <AuthLayout title='Assign User Roles'>
        <RolePermissionLayout>
            <AssignmentLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
