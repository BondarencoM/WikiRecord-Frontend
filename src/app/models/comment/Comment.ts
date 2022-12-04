export class Comment {

    id: number
    text: string
    domain: string
    entityId: string
    createdAt: Date
    username: string
    isDeleted = false

    constructor (init?: Partial<Comment>){
        Object.assign(this, init)
    }

    static AttachMethods(input: Comment): Comment {
        const result = Object.assign(new Comment(), input)
        return result;
    }
}
