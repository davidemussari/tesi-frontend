import { Component, ViewChild } from '@angular/core';
import {ClrWizard} from "@clr/angular";
import { DndDropEvent } from "ngx-drag-drop";

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

	drop(ev: DndDropEvent, id)  :  void {
		var id_old = ev.data.id;
		var id_now = id;
		if(id_now != id_old && id_now == 'riga1_1')
			this.value_1 = "+ " + ev.data.valore;
		else if(id_now != id_old && id_now == 'riga1_2')
			this.value_2 = "+ " + ev.data.valore;
		else if(id_now != id_old && id_now == 'riga1_3')
			this.value_3 = "+ " + ev.data.valore;
	}
	
	draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost 
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
    handle: false
  };
  
  onDragStart(event:DragEvent) {
 
    console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    
    console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    
    console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
      
    console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
  onDraggableMoved(event:DragEvent) {
    
    console.log("draggable moved", JSON.stringify(event, null, 2));
  }
      
  onDragCanceled(event:DragEvent) {
    
    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    
    console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop(event:DndDropEvent) {
  
    console.log("dropped", JSON.stringify(event, null, 2));
  }
}
