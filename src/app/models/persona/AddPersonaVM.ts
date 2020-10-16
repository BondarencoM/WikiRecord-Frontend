export class AddPersonaVM{
    name: string

    constructor(init?: Partial<AddPersonaVM>){
        Object.assign(this, init)
    }
}
