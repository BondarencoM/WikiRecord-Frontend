import { Persona } from '../persona/Persona';
import { Interest } from '../interest/Interest';

export class Recommendation{

    id?: number
    persona: Persona
    interest: Interest
    context: string
    isConfirmed: boolean
    addedBy: string

    static AttachMethods(input: Recommendation): Recommendation {
        const result = Object.assign(new Recommendation(), input)
        if (input.persona) { result.persona = Persona.AttachMethods(input.persona) }
        if (input.interest) { result.interest = Interest.AttachMethods(input.interest) }
        return result;
    }
}
