import { Identifiable } from '../../Identifiable';

export interface WikiSimplifiedPersonaVM extends Identifiable{
    id: string
    labels: {en? : string}
    descriptions: {en? :string}
    claims: { P31?: string}
    modified: string
}