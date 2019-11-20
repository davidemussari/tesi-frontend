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
	
	static ulrServerBackEnd: string = 'http://127.0.0.1:8080/';
	static apiEsercizioCasuale: string = 'esercizioCasuale';
	static apiSvolgimentoDaApprovare: string = 'svolgimentoDaApprovare';
	static apiLogin: string = 'login';
	
  constructor() { }
}
