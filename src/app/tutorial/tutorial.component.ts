import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { InputScomposizioneComponent } from '../input-scomposizione/input-scomposizione.component';
import { ImpostazioniGlobaliService } from '../impostazioni-globali.service';

@Component({
selector: 'app-tutorial',
templateUrl: './tutorial.component.html',
styleUrls: ['./tutorial.component.scss']
})
export class TutorialComponent implements OnInit {

	public step: number = 1;
	public modaleScomposizione: boolean = false;
	public numeroScomposto: number = 0;
	public indiceNumeroScomposto: number = 0;
	public passaggi: Array<any> = [['12','+','17']];
	
	public visualizzaPassaggi: boolean = true;
	@ViewChild(InputScomposizioneComponent) scomposizioneChild:InputScomposizioneComponent;
	
	ngAfterViewInit() {
		this.scomposizioneChild.controlloDecomposizione();
	}
		
	constructor(private _impostazioniGlobali:ImpostazioniGlobaliService) {}

	ngOnInit() {
		
// 		Questa e' l'iscrizione all'evento scatenato dal servizio
		this._impostazioniGlobali.visualizzaPassaggiChange.subscribe(() => {
			this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
		})    
	}

	controlloDecomposizione(){
		this.scomposizioneChild.controlloDecomposizione();
	}

	avanti(ev)  :  void {
		if(this.step < 10)
			this.step += 1;
	}

	indietro(ev)  :  void {
		if(this.step > 1)
			this.step += -1;
	}

	cliccabile(str: string): boolean{
		return !isNaN(parseInt(str));
	}
	
	drop(event: any): void{
		var valoreSovrapposto = this.passaggi[this.passaggi.length-1][event.currentIndex];
		var valoreSpostato = this.passaggi[this.passaggi.length-1][event.previousIndex];
		if (event.isPointerOverContainer){
			var ultimoPassaggio = this.passaggi[this.passaggi.length-1];
			ultimoPassaggio[event.currentIndex] = valoreSovrapposto + ' + ' + valoreSpostato
			ultimoPassaggio.splice(event.previousIndex, 1);
			this.passaggi.push(ultimoPassaggio);
		}
	}
}
