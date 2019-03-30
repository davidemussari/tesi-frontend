import { Component, OnInit } from '@angular/core';
import { InputScomposizioneComponent } from './input-scomposizione/input-scomposizione.component';

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
	public decomposizione:string = '';
	public decomposizioneCorretta: boolean = true; /*Variabile necessaria per avere alert di errore*/
	public passaggi: Array<any> = [['12','+','17']];
constructor() {}

ngOnInit() {
}


avanti(ev)  :  void {
	if(this.step < 10)
		this.step += 1;
}

indietro(ev)  :  void {
	if(this.step > 1)
		this.step += -1;
}

controlloDecomposizione(): void{
	this.decomposizioneCorretta = this.decomposizione.match(/^[+-0123456789 ]+$/g) !== null && this.numeroScomposto == eval(this.decomposizione);
	if(this.decomposizioneCorretta){
		this.modaleScomposizione = false; /*chiude la modale*/
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
		this.decomposizione = '';
	}
}

cliccabile(str: string): boolean{
	return !isNaN(parseInt(str));
}


}
