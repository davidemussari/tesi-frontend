import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class VariabiliGlobaliService {

	static tipologia = {
		addizione: "addizione",
		sottrazione: "sottrazione",
		moltiplicazione: "moltiplicazione",
		divisione: "divisione"
	};
	
	static punteggioMassimo: number = 5;
	
	static ulrServerBackEnd: string = 'http://127.0.0.1:8080/';
	static apiEsercizioCasuale: string = 'esercizioCasuale';
	static apiSvolgimentoDaApprovare: string = 'putSvolgimentoDaApprovare';
	static apiEsercizioSvolto: string = 'putEsercizioSvoltoStudenti';
	static apiEserciziSvoltiStudente: string = 'eserciziSvolti';
	static apiLogin: string = 'login';
	static apiSalvaCommentoPunteggio: string = 'salvaCommentoPunteggio';
	
  constructor() { }
}
