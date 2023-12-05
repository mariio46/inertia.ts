type MetaLinksType = {
    url: string | null;
    label: string;
    active: boolean;
};

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: MetaLinksType[];
    path: string;
    per_page: number;
    to: number;
    total: number;
    has_pages: boolean;
}

export interface Links {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
}

export interface MetaLinks {
    meta: Meta;
    links: Links;
}
