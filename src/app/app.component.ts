import { Component } from '@angular/core';
import { ImpostazioniGlobaliService } from './services/impostazioni-globali.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ImpostazioniGlobaliService],
})
export class AppComponent {

    public visualizzaPassaggi = true;

    constructor(private _impostazioniGlobali: ImpostazioniGlobaliService) {

        /*Serve per agganciare al momento del disegno della pagina il valore
         e permette di rappresentarlo con il toggle-switch nella posizione corretta*/
        this.visualizzaPassaggi = this._impostazioniGlobali.visualizzaPassaggi;
    }

    ngOnInit() { }

    cambia() {
        /*Chiama il setter del servizio in cui è allocato il valore della 
        variabile aggiornato costantemente (sara' lui a scatenare l'evento)*/
        this._impostazioniGlobali.visualizzaPassaggiSetter();
    }
}
