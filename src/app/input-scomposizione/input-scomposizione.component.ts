import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener,
	AfterViewInit,  ElementRef, ViewEncapsulation} from '@angular/core';
import { UserApiService } from '../services/user-api.service';

import * as Myscript from 'myscript';

@Component({
selector: 'app-input-scomposizione',
templateUrl: './input-scomposizione.component.html',
styleUrls: ['./input-scomposizione.component.scss']
})
export class InputScomposizioneComponent implements OnInit {

	private userApiService: UserApiService;
	
	@Input() numeroScomposto;
	@Input() indiceNumeroScomposto;
	@Input() paginaScomposizione;
	@Output() paginaScomposizioneChange = new EventEmitter();
	@Input() passaggi;
	@Output() passaggiChange = new EventEmitter();
	
	@ViewChild("editor", {read: ElementRef, static: false}) domEditor: ElementRef;
	
	private editor: any;
	private result: string = '';
	
	public decomposizione: string = '';
	public decomposizioneCorretta: boolean = true; /*
													 * Variabile necessaria per
													 * avere alert di errore
													 */
	convert(){
		this.editor.convert();
		this.datiScritti()
	}
	
	@HostListener('exported', ['$event']) exported(event: any) {
		var exports = event.detail.exports;
        this.result = exports['application/x-latex'];
	  }
	
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
		              customGrammarContent: "symbol = 0 1 2 3 4 5 6 7 8 9 + -\ncharacter ::= identity(symbol)\nexpression ::= identity(character) | hpair(expression, expression)\nstart(expression)"
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
	
	datiScritti(){
		this.decomposizione = this.result;	
		this.controlloDecomposizione();
	}
	
	controlloDecomposizione(): void{		
		this.decomposizioneCorretta =
			this.decomposizione.match(/^\ *-?\ *[1-9]([\d]*)((\ *[+-]\ *[1-9]([\d]*))+)\ *$/)!==null
			&& this.numeroScomposto == eval(this.decomposizione);
		if(this.decomposizioneCorretta){
			var temp: string[] = [];
			var passaggio = this.decomposizione.replace(/\+/gi, ",+,").replace(
					/\-/gi,",-,").split(',');
			for (var _i = 0; _i < this.passaggi[this.passaggi.length-1].length; _i++){
				if(_i == this.indiceNumeroScomposto){
					for(let scomp of passaggio)
						temp.push(scomp);
				}else{
					temp.push(this.passaggi[this.passaggi.length-1][_i]);
				}
			}
			this.passaggi.push(temp);
			this.passaggiChange.emit(this.passaggi);
			this.paginaScomposizione = false; // fa chiudere la modale
			this.paginaScomposizioneChange.emit(this.paginaScomposizione);
			this.decomposizione = '';
			
		}
	}

	constructor(_userApiService: UserApiService) {
		this.userApiService = _userApiService;
	}
	
	annulla(){
		this.paginaScomposizione = false;
		this.paginaScomposizioneChange.emit(this.paginaScomposizione);
		this.decomposizione = '';
		this.editor.clear();
	}
	
	ngOnInit() {
	}
}