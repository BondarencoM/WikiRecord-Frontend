import { WikiSimplifiedEntityVM } from '../wiki/WikiSimplifiedEntityVM'

export class WikiPersonVM{

    constructor(init?: Partial<WikiPersonVM>){
        Object.assign(this, init)
    }

    wikiId: string
    name: string
    description: string
    modified: string

    static OrderByModifiedDateDesc(a: WikiPersonVM, b: WikiPersonVM): number {
        return b.modified.localeCompare(a.modified)
    }

    static PersonaModelMapper(entity: WikiSimplifiedEntityVM): WikiPersonVM {
        return new WikiPersonVM({
          wikiId: entity.id,
          name: entity.labels.en,
          description: entity.descriptions.en,
          modified: entity.modified
        })
      }

    static PersonaEntityFilter = (e: WikiSimplifiedEntityVM) => e.claims.P31  && e.claims.P31[0] === 'Q5'


}
