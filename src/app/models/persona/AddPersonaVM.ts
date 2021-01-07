import { WikiPersonVM } from './WikiPersonVM'

export class AddPersonaVM{
    wikiId: string

    constructor (init?: Partial<AddPersonaVM>){
        Object.assign(this, init)
    }
}
