import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { Esercizio } from '../models/Esercizio';

@Component({
  selector: 'app-righe-passaggi',
  templateUrl: './righe-passaggi.component.html',
  styleUrls: ['./righe-passaggi.component.scss']
})
export class RighePassaggiComponent implements OnInit {
	
	public visualizzaPassaggi: boolean = true;
	@Input() visualizzaHeaderCard: boolean = false;
	@Input() dimostrativoFisso: boolean = false;
	@Input() paginaAssociativa: boolean = false;
	@Output() paginaAssociativaChange = new EventEmitter();
	@Input() esercizio: Esercizio;
	@Output('esercizioChange') esercizioChange = new EventEmitter();
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
	@Input() soluzioneConosciutaCorretta: boolean = false;
	@Output() soluzioneConosciutaCorrettaChange = new EventEmitter();
	@Input() soluzioneSbagliata: boolean = false;
	@Output() soluzioneSbagliataaChange = new EventEmitter();

	constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) {}
	
	ngOnInit() {
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			if(!this.dimostrativoFisso)
				this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
			else
				this.visualizzaPassaggi = true;
		})
	}
	
	cliccabile(str: string): boolean {
		return !isNaN(parseInt(str));
	}
	
	drop(event: any): void {
		if (event.isPointerOverContainer && this.cliccabile(this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][event.currentIndex]) && this.cliccabile(this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][event.previousIndex]) && event.currentIndex != event.previousIndex) {
			this.eventoDrop = event;
			this.eventoDropChange.emit(this.eventoDrop);
			
			var tempSpostato = this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][event.previousIndex];
			if(event.previousIndex > 0 &&
					this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][event.previousIndex-1] == '-')
					tempSpostato = -tempSpostato;
			this.valoreSpostato = tempSpostato;
			this.valoreSpostatoChange.emit(this.valoreSpostato);
			
			var tempSovrapposto = this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][event.currentIndex];
			if(event.currentIndex > 0 &&
					this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][event.currentIndex-1] == '-')
					tempSovrapposto = -tempSovrapposto;
			this.valoreSovrapposto =  tempSovrapposto;
			this.valoreSovrappostoChange.emit(this.valoreSovrapposto);
			
			this.paginaAssociativa = true;
			this.paginaAssociativaChange.emit(this.paginaAssociativa);
		}
	}

	eliminaPassaggio() {
		this.esercizio.testoEsercizio.pop();
		this.esercizioChange.emit(this.esercizio);
		this.soluzioneConosciutaCorretta = true;
		this.soluzioneConosciutaCorrettaChange.emit(this.soluzioneConosciutaCorretta);
	}
	
	isArray(elemento: any) {
		if (Array.isArray(elemento))
			if(elemento.length == 1)
				return false;
			else
				return true;
		else
			return false;
			
	}
	
	nuovoEsercizio(){
		this.EventoNuovoEsercizio.emit('nuovoEsercizio');
	}
	
	paginaScomposizioneSet(visualizzarePaginaScomposizione, nScomposto, indexNumeroScomposto){
		if(indexNumeroScomposto > 0 &&
				this.esercizio.testoEsercizio[this.esercizio.testoEsercizio.length - 1][indexNumeroScomposto-1] == '-')
			nScomposto = -nScomposto;
		this.numeroScomposto = nScomposto;
		this.numeroScompostoChange.emit(this.numeroScomposto);
		this.indiceNumeroScomposto = indexNumeroScomposto;
		this.indiceNumeroScompostoChange.emit(this.indiceNumeroScomposto);
		this.paginaScomposizione = visualizzarePaginaScomposizione;
		this.paginaScomposizioneChange.emit(this.paginaScomposizione);
	}
	
	coloreSoluzione(){
		if (this.soluzioneConosciutaCorretta)
			return 'risultatoCorretto';
		if(this.soluzioneSbagliata || this.esercizio.punteggio == 0)
			return'risultatoSbagliato';
	}
}
