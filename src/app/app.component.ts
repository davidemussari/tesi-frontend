import { Component } from '@angular/core';
import { ImpostazioniGlobaliService } from './services/impostazioni-globali.service';
import { Router } from '@angular/router';
import { IsloggedService } from './services/islogged.service';
import { User } from './models/User';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ImpostazioniGlobaliService],
})
export class AppComponent {

    public visualizzaPassaggi = true;
    private user: User = new User();

    constructor(private _impostazioniGlobali: ImpostazioniGlobaliService,
        private _router: Router,
        private _isLoggedService: IsloggedService) {

        /*Serve per agganciare al momento del disegno della pagina il valore
         e permette di rappresentarlo con il toggle-switch nella posizione corretta*/
        this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;

        _isLoggedService.utenteLoggatoOsservable$.subscribe(
            ut => {
                this.user = ut;
            });
    }
    
    cambia() {
        /*Chiama il setter del servizio in cui è allocato il valore della
        variabile aggiornato costantemente (sara' lui a scatenare l'evento)*/
        this._impostazioniGlobali.visualizzaPassaggiSetter();
    }

}
