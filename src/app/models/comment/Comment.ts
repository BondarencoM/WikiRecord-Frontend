export class Comment {

    text: string
    domain: string
    entityId: string
    creationDate: Date
    username: string

    constructor (init?: Partial<Comment>){
        Object.assign(this, init)
    }
}
