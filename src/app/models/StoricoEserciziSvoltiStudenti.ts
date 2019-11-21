export class StoricoEserciziSvoltiStudenti {
    
    public idEsercizio: number;
    public primary = {
		    idStudente: null,
		    data: null
    };
    public passaggi: string;
    public punteggio: number;

    constructor() {
        this.idEsercizio = null;
        this.primary = {
		    idStudente: null,
		    data: null
    	};
        this.passaggi = null;
        this.punteggio = null;
    }
}