import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener,
	AfterViewInit,  ElementRef, ViewEncapsulation} from '@angular/core';
import * as Myscript from 'myscript';

@Component({
selector: 'app-input-somma-algebrica',
templateUrl: './input-somma-algebrica.component.html',
styleUrls: ['./input-somma-algebrica.component.scss']
})
export class InputSommaAlgebricaComponent implements OnInit {
	
	@Input() eventoDrop: any;
	@Input() paginaAssociativa;
	@Output() paginaAssociativaChange = new EventEmitter();
	@Input() valoreSovrapposto;
	@Input() valoreSpostato;
	@Input() passaggi;
	@Output() passaggiChange = new EventEmitter();
	
	@ViewChild("editor", {read: ElementRef, static: false}) domEditor: ElementRef;
	
	private editor: any;
	private result: string = '';
	
	public sommaAlgebrica:string = '';
	public sommaAlgebricaCorretta: boolean = true; /*
													 * Variabile necessaria per
													 * avere alert di errore
													 */
	constructor() { }
	
	ngOnInit() {}
	
	ngAfterViewInit() : void {
		
		var editorNativeElement = this.domEditor.nativeElement;
	    
	    this.editor = Myscript.register(editorNativeElement, {
	    	recognitionParams: {
	    		type: 'MATH',
		    	protocol: 'WEBSOCKET',
		    	apiVersion: 'V4',
		    	server: {
		    		scheme: 'https',
		    		host: 'webdemoapi.myscript.com',
		    		applicationKey: 'f1355ec8-c74a-4da9-8d63-691ab05952eb',
		    		hmacKey: '752acf37-5a45-481b-9361-fcb32cd7f6a1',
		    	},
		    	v4: {
		            math: {
		              mimeTypes: ['application/x-latex'],
		              customGrammarContent: "symbol = 0 1 2 3 4 5 6 7 8 9 -\ncharacter ::= identity(symbol)\nexpression ::= identity(character) | hpair(expression, expression)\nstart(expression)"
		            },
		            export: {
		              jiix: {
		                strokes: true
		              }
		            }
		    	}
	    	}
	    });
	}
	
	convert(){
		this.editor.convert();
		this.datiScritti()
	}
	
	@HostListener('exported', ['$event']) exported(event: any) {
		var exports = event.detail.exports;
        this.result = exports['application/x-latex'];
	  }
	
	datiScritti(){
		this.sommaAlgebrica = this.result;
		this.controlloAssociativa();
	}
	
	controlloAssociativa(){
		if (this.sommaAlgebrica.substring(0,1) == '-')
			this.sommaAlgebricaCorretta = this.sommaAlgebrica.substring(1,).match(/^[\d]+$/) !== null && eval(this.sommaAlgebrica) == eval(this.valoreSpostato) + eval(this.valoreSovrapposto);
		else
			this.sommaAlgebricaCorretta = this.sommaAlgebrica.match(/^[\d]+$/) !== null && eval(this.sommaAlgebrica) == eval(this.valoreSpostato) + eval(this.valoreSovrapposto);
		if(this.sommaAlgebricaCorretta){
			if(this.passaggi[this.passaggi.length-1].length == 3){
				this.passaggi.push(this.sommaAlgebrica);
			}else{
				var temp : string[] = [];
				for (var _i = 0; _i < this.passaggi[this.passaggi.length-1].length; _i++) {
					if(_i != this.eventoDrop.currentIndex && _i != this.eventoDrop.previousIndex){
						// verifica che non siano i valori che si vogliono sommare
						if(this.passaggi[this.passaggi.length-1][_i] == '+' || this.passaggi[this.passaggi.length-1][_i] == '-' || temp.length != 0 ){
							// Se e' un segno, alla posizione _i, verifica che sia
							// preceduto da un segno
							if(temp.length == 0){
								if(_i == 0 &&
									(this.eventoDrop.previousIndex == 1 || this.eventoDrop.currentIndex == 1) &&
									(this.passaggi[this.passaggi.length-1][_i] == '+' ||
									this.passaggi[this.passaggi.length-1][_i] == '-')){
								} else{
									temp.push(this.passaggi[this.passaggi.length-1][_i]);
								}
							}else if(temp[temp.length-1] == '+' && this.passaggi[this.passaggi.length-1][_i] == '+'){
								// non fare niente, c'e' gia' il +
							}else if(temp[temp.length-1] == '-' && this.passaggi[this.passaggi.length-1][_i] == '-'){
								// non fare niente perché è giusto il -
							}else if(temp[temp.length-1] == '+' && this.passaggi[this.passaggi.length-1][_i] == '-'){
								temp.pop();
								temp.push('-');
							}else if(temp[temp.length-1] == '-' && this.passaggi[this.passaggi.length-1][_i] == '+'){
								temp.pop();
								temp.push('+');
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
			this.paginaAssociativa = false; /* fa chiudere la modale */
			this.paginaAssociativaChange.emit(this.paginaAssociativa);
		}
	}
	
	annulla(){
		this.paginaAssociativa = false; /* fa chiudere la modale */
		this.paginaAssociativaChange.emit(this.paginaAssociativa);
		this.sommaAlgebrica = '';
		this.editor.clear();
	}
}
