export class Esercizio {
    
	public idEsercizio: number;
    public tipologia: number;
    public testoEsercizio: any;
	public soluzioni: any;

    constructor() {
        this.idEsercizio = null;
        this.testoEsercizio = [];
        this.tipologia = null;
        this.soluzioni = [];
    }
}