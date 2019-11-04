import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { InputScomposizioneComponent } from '../input-scomposizione/input-scomposizione.component';
import { InputSommaAlgebricaComponent } from '../input-somma-algebrica/input-somma-algebrica.component';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';

@Component({
	selector: 'app-tutorial',
	templateUrl: './tutorial.component.html',
	styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

	public step: number = 0;
	public paginaScomposizione: boolean = false;
	public modaleAssociativa: boolean = false;
	public numeroScomposto: number = 0;
	public indiceNumeroScomposto: number = 0;
	public passaggi: Array<any> = [['12', '+', '17']];
	public visualizzaPassaggi: boolean = true;
	public visualizzaHeaderCard: boolean = false;

	ngAfterViewInit() {
	}

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) {	}
	
	submit(){}

	ngOnInit() {

		// Questa e' l'iscrizione all'evento scatenato dal servizio
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})
	}
}
