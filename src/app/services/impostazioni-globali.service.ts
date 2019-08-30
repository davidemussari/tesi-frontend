import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImpostazioniGlobaliService {

    public visualizzaPassaggi = true;
    public visualizzaPassaggiChange: Subject<boolean> = new Subject<boolean>();
    public isStudente: Boolean = null;

    visualizzaPassaggiSetter() {
        // 		Serve per cambiare il valore e sollevare un evento che, tutti e soli gli abbonati, recepiranno
        this.visualizzaPassaggi = !this.visualizzaPassaggi;
        this.visualizzaPassaggiChange.next(this.visualizzaPassaggi);
    }
}
