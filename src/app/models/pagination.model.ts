export interface Pagination < T > {
    data: T;
    links : {
        first: string,
        last: string,
        next: string,
        prev: string,
    },
    meta : {
        currentPage: number,
        from: number,
        lastPage: number,
        links: Link[],
        path: string,
        perPage: number,
        to: number,
        total: number,
    }
}

export interface Link {
    url: string,
    label: string,
    active: boolean,
}