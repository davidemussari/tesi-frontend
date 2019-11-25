export class Esercizio {
    
	public idEsercizio: number;
    public tipologia: number;
    public testoEsercizio: any;
	public soluzioni: any;
	public punteggio: number = null;

    constructor() {
        this.idEsercizio = null;
        this.testoEsercizio = [];
        this.tipologia = null;
        this.soluzioni = [];
        this.punteggio = null;
    }
}