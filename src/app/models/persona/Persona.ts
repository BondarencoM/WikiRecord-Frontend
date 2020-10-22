import { Recommendation } from '../recommendations/Recommendation';

export class Persona{
    id: number
    name: string
    description: string
    imageURL?: string
    wikiId: string
    recommendations?: Recommendation[]

    constructor(init?: Partial<Persona>){
        Object.assign(this, init)
    }

    static AttachMethods(input: Persona): Persona{
        const result = Object.assign(new Persona(), input);
        if (input.recommendations){
            result.recommendations = input.recommendations.map(Recommendation.AttachMethods)
        }
        return result;
    }

    getProfileImagePath(fallback = ''): string{
        return this.imageURL || fallback || '/assets/img/fallback-person-image.jpg'
    }
}
