import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';

@Component({
  selector: 'app-righe-passaggi',
  templateUrl: './righe-passaggi.component.html',
  styleUrls: ['./righe-passaggi.component.scss']
})
export class RighePassaggiComponent implements OnInit {
	
	public visualizzaPassaggi: boolean = true;
	@Input() visualizzaHeaderCard: boolean = false;
	@Input() paginaAssociativa: boolean = false;
	@Output() paginaAssociativaChange = new EventEmitter();
	@Input() passaggi;
	@Output() passaggiChange = new EventEmitter();
	@Input() paginaScomposizione: boolean = false;
	@Output() paginaScomposizioneChange = new EventEmitter();
	@Input() numeroScomposto;
	@Output() numeroScompostoChange = new EventEmitter();
	@Input() indiceNumeroScomposto;
	@Output() indiceNumeroScompostoChange = new EventEmitter();
	@Input() valoreSovrapposto: number = 0;
	@Output() valoreSovrappostoChange = new EventEmitter();
	@Input() valoreSpostato: number = 0;
	@Output() valoreSpostatoChange = new EventEmitter();
	@Input() eventoDrop: any;
	@Output() eventoDropChange = new EventEmitter();
	@Output() EventoNuovoEsercizio = new EventEmitter<string>();

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
			this.eventoDropChange.emit(this.eventoDrop);
			
			var tempSpostato = this.passaggi[this.passaggi.length - 1][event.previousIndex];
			if(event.previousIndex > 0 &&
					this.passaggi[this.passaggi.length - 1][event.previousIndex-1] == '-')
					tempSpostato = -tempSpostato;
			this.valoreSpostato = tempSpostato;
			this.valoreSpostatoChange.emit(this.valoreSpostato);
			
			var tempSovrapposto = this.passaggi[this.passaggi.length - 1][event.currentIndex];
			if(event.currentIndex > 0 &&
					this.passaggi[this.passaggi.length - 1][event.currentIndex-1] == '-')
					tempSovrapposto = -tempSovrapposto;
			this.valoreSovrapposto =  tempSovrapposto;
			this.valoreSovrappostoChange.emit(this.valoreSovrapposto);
			
			this.paginaAssociativa = true;
			this.paginaAssociativaChange.emit(this.paginaAssociativa);
		}
	}

	eliminaPassaggio() {
		this.passaggi.pop();
		this.passaggiChange.emit(this.passaggi);
	}
	
	isArray(elemento: any) {
		return Array.isArray(elemento);
	}
	
	nuovoEsercizio(){
		this.EventoNuovoEsercizio.emit('nuovoEsercizio');
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
