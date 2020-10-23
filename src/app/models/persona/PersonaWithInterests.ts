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

    get confirmedRecommendations(): Recommendation[] { return this.recommendations.filter(r => r.isConfirmed) }

    get pendingRecommendations(): Recommendation[] { return this.recommendations.filter(r => !r.isConfirmed) }

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

    geConfirmedtRecommendationsByType(): {[key: string]: Recommendation[] }{
        return groupBy<Recommendation>(this.confirmedRecommendations, r => r.interest.type)
    }
}
