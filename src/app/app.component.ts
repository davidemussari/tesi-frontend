import { Component, ViewChild } from '@angular/core';
import {ClrWizard} from "@clr/angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
   @ViewChild("wizardxl") wizardExtraLarge: ClrWizard;

   xlOpen: boolean = true;
   scomponi: boolean = false;
   value_1: string = "";
   value_2: string = "";
   value_3: string = "";

  drop(ev, id)  :  void {
  var id_old = ev.dragDataTransfer.id;
  var id_now = id;
  if(id_now != id_old && id_now == 'riga1_1')
    this.value_1 = "+ " + ev.dragDataTransfer.valore;
  else if(id_now != id_old && id_now == 'riga1_2')
    this.value_2 = "+ " + ev.dragDataTransfer.valore;
  else if(id_now != id_old && id_now == 'riga1_3')
    this.value_3 = "+ " + ev.dragDataTransfer.valore;
}
}
