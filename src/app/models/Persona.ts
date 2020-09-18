import { Recommendation } from './Recommendation';

export class Persona{
    frid?: string
    name: string
    imageURL?: string
    recommendations?: Recommendation[]

    getProfileImagePath(fallback: string): string{
        return this.imageURL || fallback || '/assets/img/fallback-person-image.jpg'
    }

    static AttachMethods(input: Persona): Persona{
        let result = Object.assign(new Persona(), input);
        if(input.recommendations){
            result.recommendations = input.recommendations.map(Recommendation.AttachMethods)
        }
        return result;
    }
}
