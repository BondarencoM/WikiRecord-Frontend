export class WikiInterestVM{

    constructor(init?: Partial<WikiInterestVM>){
        Object.assign(this, init)
    }

    wikiId: string
    name: string
    description: string
    modified: string

    static OrderByModifiedDateDesc(a: WikiInterestVM, b: WikiInterestVM): number {
        return b.modified.localeCompare(a.modified)
    }
}
