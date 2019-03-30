import { Component, OnInit, ViewChild } from '@angular/core';
import { InputScomposizioneComponent } from '../input-scomposizione/input-scomposizione.component';

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
	@ViewChild(InputScomposizioneComponent) scomposizioneChild:InputScomposizioneComponent;
	
ngAfterViewInit() {
	this.scomposizioneChild.controlloDecomposizione();
}
	
constructor() {}

ngOnInit() {
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


}
