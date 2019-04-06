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

ngOnInit() { this.default();
}

default(){
	this.sommaAlgebrica = '';
	this.sommaAlgebricaCorretta = true;
}


controlloAssociativa(){
	this.sommaAlgebricaCorretta = this.sommaAlgebrica.match(/^[\d\+\-\ ]+$/) !== null && eval(this.sommaAlgebrica) == eval(this.valoreSpostato) + eval(this.valoreSovrapposto);
	if(this.sommaAlgebricaCorretta){
		if(this.passaggi[this.passaggi.length-1].length == 3){
			this.passaggi.push(this.sommaAlgebrica);
		}else{
			var temp : string[] = [];
			for (var _i = 0; _i < this.passaggi[this.passaggi.length-1].length; _i++) {
				if(_i != this.eventoDrop.currentIndex && _i != this.eventoDrop.previousIndex){
					//verifica che non siano i valori che si vogliono sommare
					if(this.passaggi[this.passaggi.length-1][_i] == '+' || this.passaggi[this.passaggi.length-1][_i] == '-' || temp.length != 0 ){
						//Se e' un segno, alla posizione _i, verifica che sia preceduto da un segno
						if(temp.length == 0){
							temp.push(this.passaggi[this.passaggi.length-1][_i]);
						}else if(temp[temp.length-1] == '+' && this.passaggi[this.passaggi.length-1][_i] == '+'){
							//non fare niente, c'e' gia' il +
						}else if(temp[temp.length-1] == '-' && this.passaggi[this.passaggi.length-1][_i] == '-'){
							temp.pop();
							temp.push('+');
						}else if(temp[temp.length-1] == '+' && this.passaggi[this.passaggi.length-1][_i] == '-'){
							temp.pop();
							temp.push('-');
						}else if(temp[temp.length-1] == '-' && this.passaggi[this.passaggi.length-1][_i] == '+'){
							//non fare niente perche' c'e' gia' un -
						}else{
							temp.push(this.passaggi[this.passaggi.length-1][_i]);
						}
					}else{
							temp.push(this.passaggi[this.passaggi.length-1][_i]);
						}
				}
			}
			if(temp[temp.length-1] == '+' || temp[temp.length-1] == '-'){
				temp.pop();
			}
			temp.push("+");
			temp.push(this.sommaAlgebrica);
			if(temp[0] == '+'){
				temp.splice(0,1);
			}
			if(temp[temp.length-1] == '+' || temp[temp.length-1] == '-'){
				temp.pop();
			}
			if(temp.length < 3){
				this.passaggi.push(this.sommaAlgebrica);
			}else{
				this.passaggi.push(temp);
			}
		}
		this.passaggiChange.emit(this.passaggi);
		this.modaleAssociativa = false; /*fa chiudere la modale*/
		this.modaleAssociativaChange.emit(this.modaleAssociativa);
		this.default();
	}
}
}
