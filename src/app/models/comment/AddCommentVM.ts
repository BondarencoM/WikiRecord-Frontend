export class AddCommentVM {

    text: string
    domain: string
    entityId: string

    constructor (init?: Partial<AddCommentVM>){
        Object.assign(this, init)
    }
}
