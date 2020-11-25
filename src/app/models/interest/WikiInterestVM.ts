import { InterestType } from './Interest'
import WBK from 'wikibase-sdk'
import { WikiIdentifier } from '../wiki/WikiIdentifier'
import { WikiProperties } from '../wiki/WikiProperties'
import { WikiSimplifiedEntityVM } from '../wiki/WikiSimplifiedEntityVM'
import { Images } from 'src/app/utils/Images'

export class WikiInterestVM{

    constructor(init?: Partial<WikiInterestVM>){
        Object.assign(this, init)
    }

    wikiId: string
    name: string
    description: string
    modified: string
    instanceOf: string
    images: string[]


    static OrderByModifiedDateDesc(a: WikiInterestVM, b: WikiInterestVM): number {
        return b.modified.localeCompare(a.modified)
    }

    static InterestEntityFilter(entity: WikiSimplifiedEntityVM): boolean{
        const type = entity.claims.P31 || ['undefined']
        return Object.keys(AcceptedInterestsTypes).includes(type[0])
    }

    static InterestModelMapper(entity: WikiSimplifiedEntityVM): WikiInterestVM {
        return new WikiInterestVM({
          wikiId: entity.id,
          name: entity.labels.en,
          description: entity.descriptions.en,
          modified: entity.modified,
          instanceOf: entity.claims.P31[0],
          images: entity.claims[WikiProperties.Image],

        })
    }

    getImageUri(width: number): string{
      return this.images
                      ? WBK.getImageUrl(this.images[0], width)
                      : null
    }
}

const BookTypes = [
    WikiIdentifier.Anthalogy,
    WikiIdentifier.Book,
    WikiIdentifier.EpicPoem,
    WikiIdentifier.Haiku,
    WikiIdentifier.LiteraryWork,
    WikiIdentifier.Myth,
    WikiIdentifier.Novel ,
    WikiIdentifier.Novella ,
    WikiIdentifier.Play,
    WikiIdentifier.Poem ,
    WikiIdentifier.ShortStory,
    WikiIdentifier.ShortNovel,
    WikiIdentifier.WrittenWork,
    WikiIdentifier.Xiaoshuo,
  ]

const MovieTypes = [
    WikiIdentifier.AnimatedSeries,
    WikiIdentifier.AnimeTVSeries,
    WikiIdentifier.FeatureFilm,
    WikiIdentifier.Film3D,
    WikiIdentifier.Film,
    WikiIdentifier.Miniseries,
    WikiIdentifier.TVSeries,
    WikiIdentifier.TVSerial,
  ]

const GameTypes = [
    WikiIdentifier.VideoGame,
    WikiIdentifier.VideoGameMod,
  ]

const PodcastTypes = [
    WikiIdentifier.Podcast,
    WikiIdentifier.RadioDramaSeries,
  ]

const OtherTypes = [
    WikiIdentifier.CreativeWork,
  ]

const TypeMapper: {[x: string]: InterestType} = {}

BookTypes   .forEach(e => TypeMapper[e.toString()] = InterestType.Book)
MovieTypes  .forEach(e => TypeMapper[e.toString()] = InterestType.Movie)
GameTypes   .forEach(e => TypeMapper[e.toString()] = InterestType.Game)
PodcastTypes.forEach(e => TypeMapper[e.toString()] = InterestType.Podcast)
OtherTypes  .forEach(e => TypeMapper[e.toString()] = InterestType.Other)

export const AcceptedInterestsTypes = TypeMapper
