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
		this.decomposizioneCorretta = this.decomposizione.match(/^(\ *0*[1-9]([\d]*)\ *[+-])+\ *0*[1-9]([\d]*)\ *$/)!== null && this.numeroScomposto == eval(this.decomposizione);
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
/*
stringaNumero(str: string){
	var _i = 0;
	while(_i < str.length() && str.isNumber())
		_i++;
	return _i;
}

trovaSpazio(str: string){
	var _i = 0;
	while(_i < str.length && str.charAt(_i == ' '))
		i++;
	return str.substring(_i, str.length);
}

parseExpression(trovatoNumero: boolean, str: string, a: Array<string>){
	var _del: number = 0;
	var char: string = '';
	var strTemp: string = '';
	str = trovaSpazio(str); //cancella gli spazi vuoti
	if (str.length == 0)
		return false; //la stringa vuota non e' accettabile
	_del = trovaSpazio(str);
	if (_del == 0)
		return false;
	temp = str.substring(0, del);
	if (eval(temp) == 0)
		return false;
	a.push(tmp);
	str = trovaSpazio(str.substring(del,str.length());
	if (str.length() == 0)
		if (check)
			return false;
		else
			return false;
	c = str.charAt(0);
	
	
}

*/

}




/*
import java.util.ArrayList;

public class Test{
  public static void main(String[] args){
    int i;
    ArrayList<String> s =parse_expression(args[0]); 
    if(s==null) System.out.println("ERRORE");
    else System.out.println(s);
  }
  
  public static int e_case(boolean check, String str, ArrayList<String> a){
    
    str=dropWhile_isSpace(str); //cancello spazi iniziali
    if(str.length()==0) return -1; //la stringa vuota non è un'espressione corretta
    del=takeWhile_isDigit(str);
    if(del==0) return -1;
    tmp=str.substring(0,del);
    if(Integer.parseInt(tmp)==0) return -1; //Se trovo un numero diverso da zero lo inserisco nell'array
    a.add(tmp);
    str = dropWhile_isSpace(str.substring(del,str.length()));
    if(str.length()==0) 
		if check 
			return 1;
		else -1; //ossia ho trovato un solo numero 
    c=str.charAt(0);
    if(c=='+' || c=='-') a.add(c+"");
    else return -1;
    return e_case(true,str.substring(1,str.length()),a);
  }
  
  public static ArrayList<String> parse_expression(String str){
    int res;
    ArrayList<String> a = new ArrayList<>();
    res = e_case(false,str,a);
    if(res<0) return null;
    return a;
  }
  
}*/
