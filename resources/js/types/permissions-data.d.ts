import { PageProps } from '.';
import { Links, Meta } from './meta-links';

export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created: string;
    updated: string;
}

export interface DataPermission extends PageProps {
    permissions: {
        data: Permission[];
        links: Links;
        meta: Meta;
    };
}
