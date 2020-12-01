export interface IWikiSearchResult{
    search: {
        id: string
        label: string
        description: string
    }[],
    'search-continue'?: number
}
