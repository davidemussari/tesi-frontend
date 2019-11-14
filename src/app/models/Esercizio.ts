export class Esercizio {
    
	public id: number;
    public tipologia: number;
    public testoEsercizio: any;

    constructor() {
        this.id = null;
        this.testoEsercizio = [];
        this.tipologia = null;
    }
}