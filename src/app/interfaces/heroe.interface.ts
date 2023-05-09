export interface Heroe{
    id:                 number;
    alterEgo:           string;
    characters:         string;
    firstAppearance:    string;
    publisher:          Publisher;
    superHero:          string;
    alt_image?:         string;
    getImageHashCode:   number;
}

export interface HeroePage{
    currentPage:number;
    pageSize:number;

}

export enum Publisher {
    DC_COMICS = 'DC Comics',
    MARVEL_COMICS = 'Marvel Comics'
}