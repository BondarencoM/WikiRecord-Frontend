import { Images } from 'src/app/utils/Images';
import { Recommendation } from '../recommendations/Recommendation';

export class Persona{
    id: number
    name: string
    description: string
    imageUri?: string
    wikiId: string
    wikipediaUri: string
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

    getProfileImagePath({fallback = '', width = 600} = {}): string{
        return this.imageUri ? this.imageUri + '?width=' + width : ''
                    || fallback
                    || Images.FallbackPersonaImage
    }
}
