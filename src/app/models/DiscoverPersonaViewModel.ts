import { Persona } from './Persona';
import { Interest } from './Interest';

export class DiscoverPersonaViewModel{

    static AttachMethods(input: DiscoverPersonaViewModel){
        let result = Object.assign(new DiscoverPersonaViewModel(), input)
        result.persona = Persona.AttachMethods(input.persona)
        result.interests = input.interests.map(Interest.AttachMethods)
        return result;
    }

    persona: Persona
    interests: Interest[]

    get shortInterestsList(){
        return this.interests.slice(0, 4)
    }
}
