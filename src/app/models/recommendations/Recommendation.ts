import { Persona } from '../persona/Persona';
import { Interest } from '../interest/Interest';

export class Recommendation{

    id?: number
    persona: Persona
    interest: Interest
    context: string

    static AttachMethods(input: Recommendation): Recommendation {
        const result = Object.assign(new Recommendation(), input)
        result.persona = Persona.AttachMethods(input.persona)
        result.interest = Interest.AttachMethods(input.interest)
        return result;
    }
}
