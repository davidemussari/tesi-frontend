import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';

@Component({
  selector: 'app-righe-passaggi',
  templateUrl: './righe-passaggi.component.html',
  styleUrls: ['./righe-passaggi.component.scss']
})
export class RighePassaggiComponent implements OnInit {
	
	@Input() visualizzaHeaderCard: boolean = true;
	@Input() paginaAssociativa: boolean = false;
	@Input() passaggi;
	@Output() passaggiChange = new EventEmitter();
	@Input() paginaScomposizione: boolean = false;
	@Output() paginaScomposizioneChange = new EventEmitter();
	@Input() numeroScomposto;
	@Output() numeroScompostoChange = new EventEmitter();
	@Input() indiceNumeroScomposto;
	@Output() indiceNumeroScompostoChange = new EventEmitter();
	
	public visualizzaPassaggi: boolean = true;
	public eventoDrop: any;
	public valoreSovrapposto: number = 0;
	public valoreSpostato: number = 0;

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) {}
	
	ngOnInit() {
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})
	}
	
	cliccabile(str: string): boolean {
		return !isNaN(parseInt(str));
	}
	
	drop(event: any): void {
		if (event.isPointerOverContainer && this.cliccabile(this.passaggi[this.passaggi.length - 1][event.currentIndex]) && this.cliccabile(this.passaggi[this.passaggi.length - 1][event.previousIndex]) && event.currentIndex != event.previousIndex) {
			this.eventoDrop = event;
			this.valoreSovrapposto = this.passaggi[this.passaggi.length - 1][event.currentIndex];
			this.valoreSpostato = this.passaggi[this.passaggi.length - 1][event.previousIndex];
			this.paginaAssociativa = true;
		}
	}

	eliminaPassaggio() {
		this.passaggi.pop();
		this.passaggiChange.emit(this.passaggi);
	}
	
	isArray(elemento: any) {
		return Array.isArray(elemento);
	}
	
	paginaScomposizioneSet(visualizzarePaginaScomposizione, nScomposto, indexNumeroScomposto){
		this.numeroScomposto = nScomposto;
		this.numeroScompostoChange.emit(this.numeroScomposto);
		this.indiceNumeroScomposto = indexNumeroScomposto;
		this.indiceNumeroScompostoChange.emit(this.indiceNumeroScomposto);
		this.paginaScomposizione = visualizzarePaginaScomposizione;
		this.paginaScomposizioneChange.emit(this.paginaScomposizione);
		
	}

}
