import {Comment} from '../comment/Comment'
export class UserProfile {

    id: string

    comments: Comment[] = []

    constructor (init?: Partial<UserProfile>){
        Object.assign(this, init)
    }

    static AttachMethods(input: UserProfile): UserProfile {
        const result = Object.assign(new UserProfile(), input)
        result.comments = input.comments?.map(Comment.AttachMethods) ?? []
        return result;
    }
}
