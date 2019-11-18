import { Component, OnInit, Input } from '@angular/core';
import { InputScomposizioneComponent } from '../input-scomposizione/input-scomposizione.component';
import { InputSommaAlgebricaComponent } from '../input-somma-algebrica/input-somma-algebrica.component';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { Esercizio } from '../models/Esercizio';

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
	public esercizio = new Esercizio();
	public esempio1 = new Esercizio();
	public esempio2 = new Esercizio();
	public visualizzaPassaggi: boolean = true;
	public valoreSovrapposto: string = '';
	public valoreSpostato: string = '';
	public eventoDrop: any;

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) {	}
	
	ngOnInit() {
		this.esercizio.testoEsercizio = [['12', '+', '17']];
		this.esempio1.testoEsercizio = [['12', '+', '17'],
			['10', '+', '2', '+', '17'],
			['10', '+', '19'],
			'29'];
		this.esempio2.testoEsercizio = [['12', '+', '17'],
			['12', '+', '20', '-', '3'],
			['32', '-', '3'],
			['30', '+', '2', '-', '3'],
			['30', '-', '1'],
			'29'];
		
		// Questa e' l'iscrizione all'evento scatenato dal servizio
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})
	}
}
