export class Esercizio {
    
	public id: number;
    public tipologia: number;
    public testoEsercizio: Array<string>;

    constructor() {
        this.id = null;
        this.testoEsercizio = [];
        this.tipologia = null;
    }
}