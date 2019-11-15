export class Esercizio {
    
	public id: number;
    public tipologia: number;
    public testoEsercizio: any;
	public soluzioni: any;

    constructor() {
        this.id = null;
        this.testoEsercizio = [];
        this.tipologia = null;
        this.soluzioni = [];
    }
}