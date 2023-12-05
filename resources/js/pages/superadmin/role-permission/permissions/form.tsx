import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { PageSettingsType } from '@/types/page-settings';
import { Permission } from '@/types/permissions-data';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import RolePermissionLayout from '../role-permission-layout';
import PermissionLayout from './permission-layout';

type PermissionFormType = {
    permission: Permission;
    page_settings: PageSettingsType;
};

export default function PermissionForm({ permission, page_settings }: PermissionFormType) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: permission.name ?? '',
        guard_name: page_settings.url === route('permissions.store') ? '' : permission.guard_name,
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
            <CardContent>
                <form onSubmit={submit} method='post' className='space-y-4'>
                    <div>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            id='name'
                            name='name'
                            className='mt-1'
                            autoComplete='name'
                            required
                            autoFocus
                        />
                        <InputError message={errors.name} className='mt-2' />
                    </div>
                    <div>
                        <Label htmlFor='guard_name'>Guard Name</Label>
                        <Input
                            value={data.guard_name}
                            onChange={(e) => setData('guard_name', e.target.value)}
                            id='guard_name'
                            name='guard_name'
                            className='mt-1'
                            autoComplete='guard_name'
                            placeholder='Default to web'
                        />
                        <InputError message={errors.guard_name} className='mt-2' />
                    </div>
                    <Button type='submit' disabled={data.name === '' ? true : processing}>
                        Save
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

PermissionForm.layout = (page: React.ReactNode) => (
    <AuthLayout title='Permission Form'>
        <RolePermissionLayout>
            <PermissionLayout children={page} />
        </RolePermissionLayout>
    </AuthLayout>
);
