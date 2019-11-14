import { Component, OnInit, Input } from '@angular/core';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { EserciziApiService } from '../services/esercizi-api.service';
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
	private spinner: boolean = true;
	
	private eserciziApiService: EserciziApiService;
	private tipologia: string = 'addizione';

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService,
			private _eserciziApiService: EserciziApiService) {
		this.eserciziApiService = _eserciziApiService;
	}
	
	nuovoEsercizio(){
		this.spinner = true;
		this.eserciziApiService.esercizioCasuale(1).subscribe((response: Esercizio) => {
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
}

