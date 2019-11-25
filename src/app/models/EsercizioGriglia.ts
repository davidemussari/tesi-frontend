export class EsercizioGriglia {
    
	public idEsercizio: number;
    public tipologia: number;
    public testoEsercizio: any;
	public passaggi: any;
	public data: Date;
	public nomeAlunno: string;
	public cognomeAlunno: string;
	public commenti: string;
	public idStudente: number;
	public punteggio: number;

    constructor() {
        this.idEsercizio = null;
        this.testoEsercizio = [];
        this.tipologia = null;
        this.passaggi = [];
        this.data = null;
        this.nomeAlunno = null;
        this.cognomeAlunno = null;
        this.commenti = "";
        this.idStudente = null;
        this.punteggio = null;
    }
}