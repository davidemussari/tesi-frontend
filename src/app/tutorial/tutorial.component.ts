import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
	public modaleScomposizione: boolean = false;
	public modaleAssociativa: boolean = false;
	public numeroScomposto: number = 0;
	public indiceNumeroScomposto: number = 0;
	public valoreSovrapposto: number = 0;
	public valoreSpostato: number = 0;
	public passaggi: Array<any> = [['12', '+', '17']];
	public visualizzaPassaggi: boolean = true;
	public eventoDrop: any;

	@ViewChild(InputScomposizioneComponent, { static: true }) scomposizioneChild: InputScomposizioneComponent;
	@ViewChild(InputSommaAlgebricaComponent, { static: true }) associativaChild: InputSommaAlgebricaComponent;

	ngAfterViewInit() {
		this.scomposizioneChild.controlloDecomposizione();
		this.associativaChild.controlloAssociativa();
	}

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) { }

	ngOnInit() {

		// 		Questa e' l'iscrizione all'evento scatenato dal servizio
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})
	}

	controlloDecomposizione() {
		this.scomposizioneChild.controlloDecomposizione();
	}

	controlloAssociativa() {
		this.associativaChild.controlloAssociativa();
	}

	avanti(ev): void {
		if (this.step < 2)
			this.step += 1;
	}

	indietro(ev): void {
		if (this.step > 0)
			this.step += -1;
	}

	cliccabile(str: string): boolean {
		return !isNaN(parseInt(str));
	}

	isArray(elemento: any) {
		return Array.isArray(elemento);
	}

	drop(event: any): void {
		if (event.isPointerOverContainer && this.cliccabile(this.passaggi[this.passaggi.length - 1][event.currentIndex]) && this.cliccabile(this.passaggi[this.passaggi.length - 1][event.previousIndex]) && event.currentIndex != event.previousIndex) {
			this.eventoDrop = event;
			this.valoreSovrapposto = this.passaggi[this.passaggi.length - 1][event.currentIndex];
			this.valoreSpostato = this.passaggi[this.passaggi.length - 1][event.previousIndex];
			this.modaleAssociativa = true;
		}
	}

	eliminaPassaggio() {
		this.passaggi.pop();
	}
}
