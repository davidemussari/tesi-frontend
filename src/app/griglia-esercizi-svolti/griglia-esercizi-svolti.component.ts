import { Component, OnInit } from '@angular/core';
import { EserciziApiService } from '../services/esercizi-api.service';
import { VariabiliGlobaliService } from '../services/variabili-globali.service';
import { IsloggedService } from '../services/islogged.service';
import { User } from '../models/User';
import { EsercizioGriglia } from '../models/EsercizioGriglia';

@Component({
  selector: 'app-griglia-esercizi-svolti',
  templateUrl: './griglia-esercizi-svolti.component.html',
  styleUrls: ['./griglia-esercizi-svolti.component.scss']
})
export class GrigliaEserciziSvoltiComponent implements OnInit {

	private eserciziApiService: EserciziApiService;
	private spinner: boolean = true;
	private user: User = new User();
	public esercizi = [];
	
  constructor(private _eserciziApiService: EserciziApiService, private _isLoggedService: IsloggedService) {
	  this.eserciziApiService = _eserciziApiService;
	  this.user = _isLoggedService.getUtenteLoggato();
  }
  
  ngOnInit() {
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
	  				this.esercizi.push(es);
	  			}
		        this.spinner = false;
		        }
	    });
  }

}
