import { Persona } from './Persona';
import { Recommendation } from './Recommendation';

export class DiscoverPersonaViewModel{

    persona: Persona
    recommendations: Recommendation[]

    get shortRecommendationsList(): Recommendation[]{
        return this.recommendations.slice(0, 4)
    }

    static AttachMethods(input: DiscoverPersonaViewModel): DiscoverPersonaViewModel{
        const result = Object.assign(new DiscoverPersonaViewModel(), input)
        result.persona = Persona.AttachMethods(input.persona)
        result.recommendations = input.recommendations.map(Recommendation.AttachMethods)
        return result;
    }
}
