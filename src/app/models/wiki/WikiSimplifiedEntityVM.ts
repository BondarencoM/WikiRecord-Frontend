import { Identifiable } from '../Identifiable';

export interface IWikiSimplifiedEntityVM extends Identifiable{
    id: string
    labels: {en?: string}
    descriptions: {en?: string}
    claims: {
        P31?: string[]
        P18?: string[]
    }
    modified: string
}
