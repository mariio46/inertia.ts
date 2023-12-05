export interface User {
    id: number;
    name: string;
    fallback: string;
    avatar: string;
    username: string;
    email: string;
    has_roles: {
        superadmin?: boolean;
        admin?: boolean;
        operator?: boolean;
        instructor?: boolean;
        crew?: boolean;
    };
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};
