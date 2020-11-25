import { WikiSimplifiedEntityVM } from '../wiki/WikiSimplifiedEntityVM'
import WBK from 'wikibase-sdk'
import { WikiProperties } from '../wiki/WikiProperties'
import { Images } from 'src/app/utils/Images'

export class WikiPersonVM{

    constructor(init?: Partial<WikiPersonVM>){
        Object.assign(this, init)
    }

    wikiId: string
    name: string
    description: string
    modified: string
    images: string[]

    static OrderByModifiedDateDesc(a: WikiPersonVM, b: WikiPersonVM): number {
        return b.modified.localeCompare(a.modified)
    }

    static PersonaModelMapper(entity: WikiSimplifiedEntityVM): WikiPersonVM {
        return new WikiPersonVM({
          wikiId: entity.id,
          name: entity.labels.en,
          description: entity.descriptions.en,
          modified: entity.modified,
          images: entity.claims[WikiProperties.Image],
        })
      }

    static PersonaEntityFilter = (e: WikiSimplifiedEntityVM) => e.claims.P31  && e.claims.P31[0] === 'Q5'

    getImageUri(width = 600): string{
      return this.images
                      ? WBK.getImageUrl(this.images[0], width)
                      : Images.FallbackPersonaImage
    }


}
