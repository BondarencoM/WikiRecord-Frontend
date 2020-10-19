import { WikiIdentifier } from '../wiki/WikiIdentifier'
import { WikiSimplifiedEntityVM } from '../wiki/WikiSimplifiedEntityVM'

export class WikiInterestVM{

    constructor(init?: Partial<WikiInterestVM>){
        Object.assign(this, init)
    }

    wikiId: string
    name: string
    description: string
    modified: string

    static OrderByModifiedDateDesc(a: WikiInterestVM, b: WikiInterestVM): number {
        return b.modified.localeCompare(a.modified)
    }

    static InterestEntityFilter(entity: WikiSimplifiedEntityVM): boolean{
        const type = entity.claims.P31 || ['undefined']
        return AcceptedInterestsTypes.includes(type[0])
    }

    static InterestModelMapper(entity: WikiSimplifiedEntityVM): WikiInterestVM {
        return new WikiInterestVM({
          wikiId: entity.id,
          name: entity.labels.en,
          description: entity.descriptions.en,
          modified: entity.modified
        })
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

export const AcceptedInterestsTypes = [
    ...BookTypes,
    ...MovieTypes,
    ...GameTypes,
    ...PodcastTypes,
    ...OtherTypes,
  ].map(e => e.toString())

