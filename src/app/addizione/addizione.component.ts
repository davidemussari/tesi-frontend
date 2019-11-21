import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { EserciziApiService } from '../services/esercizi-api.service';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';
import { IsloggedService } from '../services/islogged.service';
import { Esercizio } from '../models/Esercizio';
import { SvolgimentoDaApprovare } from '../models/SvolgimentoDaApprovare';
import { StoricoEserciziSvoltiStudenti } from '../models/StoricoEserciziSvoltiStudenti';

@Component({
    selector: 'app-addizione',
    templateUrl: './addizione.component.html',
    styleUrls: ['./addizione.component.scss']
})
export class AddizioneComponent implements OnInit {
	
	public paginaScomposizione: boolean = false;
	public paginaAssociativa: boolean = false;
	public numeroScomposto: number = 0;
	public indiceNumeroScomposto: number = 0;
	public esercizio: Esercizio;
	public visualizzaPassaggi: boolean = true;
	public valoreSovrapposto: string = '';
	public valoreSpostato: string = '';
	public eventoDrop: any;
	public soluzioneConosciutaCorretta: boolean = true;

	private idUtente: number = null;
	private spinner: boolean = true;
	private eserciziApiService: EserciziApiService;

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService,
			private _eserciziApiService: EserciziApiService,
			private _isloggedService: IsloggedService) {
		this.eserciziApiService = _eserciziApiService;
		this.idUtente = _isloggedService.getUtenteLoggato().id;
	}
	
	nuovoEsercizio(){
		this.spinner = true;
		this.esercizio = new Esercizio();
		this.soluzioneConosciutaCorretta = true;
		this.eserciziApiService.esercizioCasuale(
			VariabiliGlobaliService.tipologia.addizione
			).subscribe((response: Esercizio) => {
		        if (response) {
		        	var splited = response.testoEsercizio.match(/\+|[^\+]+/g);
		        	response.testoEsercizio = [];
		        	response.testoEsercizio.push(splited);
		        	//notare la forma Shakespiriana della Regex: essere o non essere
		        	this.esercizio = response;
		        	this.spinner = false;
		        }
	    });
	}
	
	ngOnInit() {
		this.nuovoEsercizio();
		
		// Questa e' l'iscrizione all'evento scatenato dal servizio
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})
	}
	
	spezza(str: string){
		str = str.replace("+",";");
		str = str.replace("-", ";-");
		let strArray = str.split(";");
		if (strArray[0].length == 0)
			strArray.shift();
		return strArray;
	}
	
	passaggiToString(passaggi: any){
		let str: string = "";
		for (let p of passaggi){
			if (str.length > 0)
				str += ';';
			str += p.toString();
		}
		return str;
	}
	
	costruzioneSvolgimentoDaApprovare(): SvolgimentoDaApprovare{
		let svolgimentoDaApprovare = new SvolgimentoDaApprovare();
		svolgimentoDaApprovare.idEsercizio = this.esercizio.id;
		svolgimentoDaApprovare.passaggi = this.passaggiToString(this.esercizio.testoEsercizio);
		svolgimentoDaApprovare.primary = {
			idStudente: this.idUtente,
			data: new Date()
		};
		return svolgimentoDaApprovare;
	}
	
	costruzioneEserciziSvolti(): StoricoEserciziSvoltiStudenti{
		let svolgimento = new StoricoEserciziSvoltiStudenti();
		svolgimento.idEsercizio = this.esercizio.id;
		svolgimento.passaggi = this.passaggiToString(this.esercizio.testoEsercizio);
		svolgimento.primary = {
			idStudente: this.idUtente,
			data: new Date()
		};
		svolgimento.punteggio = 1;
		return svolgimento;
	}
	
	passaggiCambiati(event){
		let ultimoPassaggio = event[event.length-1].toString().replace(/,/g,"");
		ultimoPassaggio = this.spezza(ultimoPassaggio);
		let tuttoTrovato: boolean = false;
		if (this.soluzioneConosciutaCorretta){
			for (let sol of this.esercizio.soluzioni){
				let trovato: boolean = false;
				for (let uPassaggio of ultimoPassaggio){
					trovato = sol.search(uPassaggio) > -1;
				}
				if (trovato){
					tuttoTrovato = true;
					break;
				}
			}
			if (!tuttoTrovato)
				this.soluzioneConosciutaCorretta = false;
		}
		if (ultimoPassaggio.length == 1){
			if(!tuttoTrovato){
				let svolgimento = new SvolgimentoDaApprovare();
				svolgimento = this.costruzioneSvolgimentoDaApprovare();
				this.eserciziApiService.putSvolgimentoDaApprovare(svolgimento).
					subscribe((response: any) => {
					        if (!response) {
					        	alert("Si è verificato un errore");
					        }
				    });
			}else{
				let svolgimento = new StoricoEserciziSvoltiStudenti();
				svolgimento = this.costruzioneEserciziSvolti();
				this.eserciziApiService.putSvolgimento(svolgimento).
					subscribe((response: any) => {
					        if (!response) {
					        	alert("Si è verificato un errore");
					        }
				    });
			}
		}
	}
}

