export class Interest{

    name: string
    type: InterestType

    static AttachMethods(input: Interest): Interest {
        const result = Object.assign(new Interest(), input)
        return result;
    }

    getIconPath(): string{
        return `assets/img/interestIcons/${this.type}.png`
    }
}

export enum InterestType{
    Book = 'Book',
    Movie = 'Movie',
    Game = 'Game',
}
