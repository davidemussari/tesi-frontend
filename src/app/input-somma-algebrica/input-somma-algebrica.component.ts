import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
selector: 'app-input-somma-algebrica',
templateUrl: './input-somma-algebrica.component.html',
styleUrls: ['./input-somma-algebrica.component.scss']
})
export class InputSommaAlgebricaComponent implements OnInit {
	
	@Input() eventoDrop: any;
	@Input() modaleAssociativa;
	@Input() valoreSovrapposto;
	@Input() valoreSpostato;
	@Input() passaggi;
	
	@Output() passaggiChange = new EventEmitter();
	@Output() modaleAssociativaChange = new EventEmitter();
	
	public sommaAlgebrica:string = '';
	public sommaAlgebricaCorretta: boolean = true; /*Variabile necessaria per avere alert di errore*/

constructor() { }

ngOnInit() {
}

controlloAssociativa(){
	this.sommaAlgebricaCorretta = this.sommaAlgebrica.match(/^[0123456789 ]+$/g) !== null && eval(this.sommaAlgebrica) == eval(this.valoreSpostato) + eval(this.valoreSovrapposto);
	if(this.sommaAlgebricaCorretta){
		if(this.passaggi[this.passaggi.length-1].length == 3){
			this.passaggi.push(this.sommaAlgebrica);
		}else{
			var temp : string[] = [];
			for (var _i = 0; _i < this.passaggi[this.passaggi.length-1].length; _i++) {
				if(_i != this.eventoDrop.currentIndex && _i != this.eventoDrop.currentIndex-1 && _i != this.eventoDrop.previousIndex && _i != this.eventoDrop.previousIndex-1){
					temp.push(this.passaggi[this.passaggi.length-1][_i]);
				}
			}
			temp.push("+");
			temp.push(this.sommaAlgebrica);
			if(temp.length < 3)
				this.passaggi.push(this.sommaAlgebrica);
			else{
				this.passaggi.push(temp);
			}
		}
		this.passaggiChange.emit(this.passaggi);
		this.modaleAssociativa = false; /*fa chiudere la modale*/
		this.modaleAssociativaChange.emit(this.modaleAssociativa);
		this.sommaAlgebrica = '';
	}
}
}
