import { Identifiable } from '../../Identifiable';

export interface WikiSearchResult{
    search: {
        id: string
        label: string
        description: string
    }[]
}