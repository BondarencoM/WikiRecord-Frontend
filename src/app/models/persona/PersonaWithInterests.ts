import { from, of, scheduled } from 'rxjs'
import { groupBy } from 'src/app/utils/ArrayUtils'
import { Recommendation } from '../recommendations/Recommendation'

export class PersonaWithInterests{
    id: number
    name: string
    description: string
    imageURL?: string
    wikiId: string
    recommendations?: Recommendation[]

    static AttachMethods(input: PersonaWithInterests): PersonaWithInterests{
        const result = Object.assign(new PersonaWithInterests(), input);
        if (input.recommendations){
            result.recommendations = input.recommendations.map(Recommendation.AttachMethods)
        }
        return result;
    }

    getProfileImagePath(fallback = ''): string{
        return this.imageURL || fallback || '/assets/img/fallback-person-image.jpg'
    }

    getRecommendationsByType(): {[key: string]: Recommendation[] }{
        return groupBy<Recommendation>(this.recommendations, r => r.interest.type)
    }
}
