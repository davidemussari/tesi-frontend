import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../services/user-api.service';
import { Md5 } from 'ts-md5/dist/md5';
import { ImpostazioniGlobaliService } from '../services/impostazioni-globali.service';
import { Iscrizione } from '../models/Iscrizione';

@Component({
  selector: 'app-iscrizione',
  templateUrl: './iscrizione.component.html',
  styleUrls: ['./iscrizione.component.scss']
})
export class IscrizioneComponent implements OnInit {
	
	private iscritto: Iscrizione = new Iscrizione();
	private visuallizzaSuccesso: boolean = false;
	private visuallizzaErrore: boolean = false;
	private router: Router;
	private userApiService: UserApiService;

	toLogin(){
		this.router.navigate(['login']);
	}

	iscrizione(){
		this.iscritto.passwd = Md5.hashStr(this.iscritto.passwd).toString();
		if(this.iscritto.docenteAssegnato != null && this.iscritto.docenteAssegnato.trim().length == 0)
			this.iscritto.docenteAssegnato = null;
		this.userApiService.postIscrizione(this.iscritto).subscribe((response: boolean) => {
            if (response) {
            	this.visuallizzaSuccesso = true;
            	setTimeout(this.toLogin, 3000);
            } else {
                this.visuallizzaErrore = true;
            }
        });
	}

  constructor(_router: Router, _userApiService: UserApiService) {
	  this.router = _router;
	  this.userApiService = _userApiService;
  }

  ngOnInit() {
  }

}
