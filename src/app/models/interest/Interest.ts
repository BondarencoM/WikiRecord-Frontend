export class Interest{

    id: number
    name: string
    type: InterestType
    wikiId: string

    constructor(init?: Partial<Interest>){
        Object.assign(this, init)
    }

    static AttachMethods(input: Interest): Interest {
        const result = Object.assign(new Interest(), input)
        return result;
    }

    getIconPath(): string{
        return `assets/img/interestIcons/${this.type || 'Other'}.png`
    }
}




export enum InterestType {
  Book = 'Book',
  Movie = 'Movie',
  Game = 'Game',
  Podcast = 'Podcast',
  Other = 'Other'
}
