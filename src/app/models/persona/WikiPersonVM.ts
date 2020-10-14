export class WikiPersonVM{

    constructor(init?: Partial<WikiPersonVM>){
        Object.assign(this, init)
    }

    wikiId: string
    name: string
    description: string
    modified: string

    static OrderByModifiedDateDesc (a: WikiPersonVM, b: WikiPersonVM) {
        return b.modified.localeCompare(a.modified)
    }
}