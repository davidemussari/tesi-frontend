import { Component, OnInit } from '@angular/core';


interface MyObj {
    value: string;
    id: number;
}

@Component({
  selector: 'app-addizione',
  templateUrl: './addizione.component.html',
  styleUrls: ['./addizione.component.scss']
})
export class AddizioneComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

  drag (ev, val) :  void {
    ev.dataTransfer.setData("text/plain", ev.target.id);
    ev.dataTransfer.setData("valore", val);
  }

  drop(ev)  :  void {
  var data = ev.dataTransfer.getData("text");
}


}

