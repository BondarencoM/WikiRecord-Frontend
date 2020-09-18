import { Persona } from './Persona';
import { Interest } from './Interest';

export class Recommendation{

    static AttachMethods(input: Recommendation): Recommendation {
        let result = Object.assign(new Recommendation(), input)
        result.persona = Persona.AttachMethods(input.persona)
        result.interest = Interest.AttachMethods(input.interest)
        return result;
    }

    id?: number
    persona: Persona
    interest: Interest
}
