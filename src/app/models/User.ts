export class User {
    public nome: string;
    public cognome: string;
    public username: string;
	public tipoUtente: any;
	public passwd: string;
	public id: number;

    constructor() {
        this.nome = null;
        this.cognome = null;
        this.username = null;
        this.passwd = null;
        this.tipoUtente = null;
        this.id = null;
    }
}