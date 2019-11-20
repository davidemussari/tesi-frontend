import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { EserciziApiService } from '../services/esercizi-api.service';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';
import { Esercizio } from '../models/Esercizio';

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
	private spinner: boolean = true;
	private eserciziApiService: EserciziApiService;

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService,
			private _eserciziApiService: EserciziApiService) {
		this.eserciziApiService = _eserciziApiService;
	}
	
	nuovoEsercizio(){
		this.spinner = true;
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
			//chiamata put
		}
	}
}

