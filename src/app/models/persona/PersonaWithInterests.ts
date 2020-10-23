import { groupBy } from 'src/app/utils/ArrayUtils'
import { Recommendation } from '../recommendations/Recommendation'

export class PersonaWithInterests{
    id: number
    name: string
    description: string
    imageUri?: string
    wikiId: string
    wikipediaUri: string
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

    get shortRecommendationsList(): Recommendation[]{
        return this.confirmedRecommendations.slice(0, 4)
    }

    getProfileImagePath({fallback = '', width = 600} = {}): string{
        return this.imageUri ? this.imageUri + '?width=' + width : ''
                    || fallback
                    || '/assets/img/fallback-person-image.jpg'
    }

    geConfirmedtRecommendationsByType(): {[key: string]: Recommendation[] }{
        return groupBy<Recommendation>(this.confirmedRecommendations, r => r.interest.type)
    }
}
