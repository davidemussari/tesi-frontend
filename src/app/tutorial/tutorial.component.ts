import { Component, OnInit, Input } from '@angular/core';
import { InputScomposizioneComponent } from '../input-scomposizione/input-scomposizione.component';
import { InputSommaAlgebricaComponent } from '../input-somma-algebrica/input-somma-algebrica.component';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';

@Component({
	selector: 'app-tutorial',
	templateUrl: './tutorial.component.html',
	styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

	public paginaScomposizione: boolean = false;
	public paginaAssociativa: boolean = false;
	public numeroScomposto: number = 0;
	public indiceNumeroScomposto: number = 0;
	public passaggi: Array<any> = [['12', '+', '17']];
	public esempio1: Array<any> = [['12', '+', '17'],
		['10', '+', '2', '+', '17'],
		['10', '+', '19'],
		'29'];
	public esempio2: Array<any> = [['12', '+', '17'],
		['12', '+', '20', '-', '3'],
		['32', '-', '3'],
		['30', '+', '2', '-', '3'],
		['30', '-', '1'],
		'29'];
	public visualizzaPassaggi: boolean = true;
	public valoreSovrapposto: string = '';
	public valoreSpostato: string = '';
	public eventoDrop: any;

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) {	}
	
	ngOnInit() {
		// Questa e' l'iscrizione all'evento scatenato dal servizio
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})
	}
}
