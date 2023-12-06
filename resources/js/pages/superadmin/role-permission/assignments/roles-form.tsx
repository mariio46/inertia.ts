import InputError from '@/components/input-error';
import MultipleSelect from '@/components/multiple-select';
import PopoverSelect from '@/components/popover-select';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { PageSettingsType } from '@/types/page-settings';
import { useForm } from '@inertiajs/react';
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
        roles: role?.value ? role?.value : [],
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
                        <PopoverSelect
                            collections={users}
                            data={data.user}
                            setData={(e) => setData('user', e)}
                            label='User'
                        />
                        <InputError message={errors.user} className='mt-0' />
                    </div>
                    <div>
                        <Label htmlFor='roles' className='mb-2.5 block'>
                            Roles
                        </Label>
                        <MultipleSelect
                            collections={roles}
                            // @ts-ignore
                            data={data.roles}
                            // @ts-ignore
                            setData={(e) => setData('roles', e)}
                            label='Roles'
                        />
                        <InputError message={errors.roles} className='mt-0' />
                    </div>
                    <InputError message={errors.roles} className='mt-0' />
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
