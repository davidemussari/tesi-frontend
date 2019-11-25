import { Component, OnInit } from '@angular/core';
import { EserciziApiService } from '../services/esercizi-api.service';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';
import { IsloggedService } from '../services/islogged.service';
import { User } from '../models/User';
import { EsercizioGriglia } from '../models/EsercizioGriglia';
import { ClrLoadingState } from '@clr/angular';


@Component({
  selector: 'app-griglia-esercizi-svolti',
  templateUrl: './griglia-esercizi-svolti.component.html',
  styleUrls: ['./griglia-esercizi-svolti.component.scss']
})
export class GrigliaEserciziSvoltiComponent implements OnInit {

	private modaleAperta = false;
	private esercizioDaModificare = new EsercizioGriglia();
	private indexEsercizioDaModificare: number = null;
	private eserciziApiService: EserciziApiService;
	private spinner: boolean = true;
	private validateBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
	private user: User = new User();
	private valoreObbligatorioDimenticato: boolean = false;
	public esercizi = [];
	
  constructor(private _eserciziApiService: EserciziApiService, private _isLoggedService: IsloggedService) {
	  this.eserciziApiService = _eserciziApiService;
	  this.user = _isLoggedService.getUtenteLoggato();
  }
  
  generaElenco(){
	  this.esercizi = [];
	  this.spinner = true;
	  this.eserciziApiService.eserciziSvolti(this.user).
	  	subscribe((response: EsercizioGriglia[]) => {
	  		if (response) {
	  			for (let es of response){
	  				es.data = new Date(es.data);
	  				let temp = [];
	  				let passaggi = es.passaggi.split(";");
	  				for (let p of passaggi)
	  				    temp.push(p.split(","));
	  				es.testoEsercizio = temp;
	  				if (es.commenti == null)
	  					es.commenti = "";
	  				this.esercizi.push(es);
	  			}
		        this.spinner = false;
		        }
	    });
  }
  
  ngOnInit() {
	  this.generaElenco();
  }
  
  modificaEsercizioAnnulla(){
	  this.modaleAperta = false;
	  this.esercizioDaModificare = new EsercizioGriglia();
	  this.indexEsercizioDaModificare = null;
	  this.valoreObbligatorioDimenticato = false;
  }
  
  modificaEsercizio(es: EsercizioGriglia, index: number){
	  this.esercizioDaModificare = es;
	  this.indexEsercizioDaModificare = index;
	  this.modaleAperta = true;
  }
  
  modificaEsercizioConferma(){
	  if(this.esercizioDaModificare.punteggio == null || this.esercizioDaModificare.punteggio.toString() == ''){
		  this.valoreObbligatorioDimenticato = true;
	  }else{
		  this.validateBtnState = ClrLoadingState.LOADING;
		  this.esercizioDaModificare.testoEsercizio = this.esercizioDaModificare.testoEsercizio[0];
		  this.eserciziApiService.putCommentoPunteggio(this.esercizioDaModificare).
		  	subscribe((response: boolean) => {
		  		if (response) {
		  			this.validateBtnState = ClrLoadingState.SUCCESS;
			        this.modaleAperta = false;
			    }else{
			    	this.validateBtnState = ClrLoadingState.ERROR;
			    	alert("Si è verificato un errore. Ripetere salvataggio.");
			    }
		  		this.validateBtnState = ClrLoadingState.DEFAULT;
		  		this.generaElenco();
		    });
	  }
	  
  }

}
