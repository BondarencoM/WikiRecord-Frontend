export interface WikiSearchResult{
    search: {
        id: string
        label: string
        description: string
    }[],
    'search-continue'?: number
}
