import { PageProps } from '.';
import { Links, Meta } from './meta-links';

export interface UserRoleAssignment {
    id: number;
    name: string;
    username: string;
    roles: string;
}

export interface RolePermissionAssignment {
    id: number;
    name: string;
    permissions: string | null;
}

export interface DataPermissionAssignments extends PageProps {
    roles: {
        data: RolePermissionAssignment[];
        links: Links;
        meta: Meta;
    };
}

export interface DataRoleAssignments extends PageProps {
    users: {
        data: UserRoleAssignment[];
        links: Links;
        meta: Meta;
    };
}
