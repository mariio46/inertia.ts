import { PageProps } from '.';
import { Links, Meta } from './meta-links';

export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created: string;
    updated: string;
}

export interface DataRoles extends PageProps {
    roles: {
        data: Role[];
        links: Links;
        meta: Meta;
    };
}
