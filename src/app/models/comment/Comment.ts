export class Comment {

    id: number
    text: string
    domain: string
    entityId: string
    createdAt: Date
    username: string

    constructor (init?: Partial<Comment>){
        Object.assign(this, init)
    }
}
