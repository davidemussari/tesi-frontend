export class SvolgimentoDaApprovare {
    
    public idEsercizio: number;
    public primary = {
		    idStudente: null,
		    data: null
    };
    public passaggi: string;

    constructor() {
        this.idEsercizio = null;
        this.primary = {
		    idStudente: null,
		    data: null
    	};
        this.passaggi = null;
    }
}