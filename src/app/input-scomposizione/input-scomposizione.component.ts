import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
selector: 'app-input-scomposizione',
templateUrl: './input-scomposizione.component.html',
styleUrls: ['./input-scomposizione.component.scss']
})
export class InputScomposizioneComponent implements OnInit {
	
	@Input() numeroScomposto;
	@Input() indiceNumeroScomposto;
	@Input() modaleScomposizione;
	@Input() passaggi;
	@Output() passaggiChange = new EventEmitter();
	@Output() modaleScomposizioneChange = new EventEmitter();
	
	public decomposizione:string = '';
	public decomposizioneCorretta: boolean = true; /*Variabile necessaria per avere alert di errore*/
	
	controlloDecomposizione(): void{
		this.decomposizioneCorretta = this.decomposizione.match(/^[+-0123456789 ]+$/g) !== null && this.numeroScomposto == eval(this.decomposizione);
		if(this.decomposizioneCorretta){
			var temp : string[] = [];
			var passaggio = this.decomposizione.replace(/\+/gi, ",+,").replace(/\-/gi, ",-,").split(',');
			
			for (var _i = 0; _i < this.passaggi[this.passaggi.length-1].length; _i++) {
				if(_i == this.indiceNumeroScomposto){
					for(let scomp of passaggio)
						temp.push(scomp);
				}else{
					temp.push(this.passaggi[this.passaggi.length-1][_i]);
				}
			}
			this.passaggi.push(temp);
			this.passaggiChange.emit(this.passaggi);
			this.modaleScomposizione = false; /*fa chiudere la modale*/
			this.modaleScomposizioneChange.emit(this.modaleScomposizione);
			this.decomposizione = '';
		}
	}

constructor() { }

ngOnInit() {
}

}
