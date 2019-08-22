import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user';
import { UserApiService } from '../services/user-api.service';


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

    users: User[];


    constructor(private userService: UserApiService) { }
    
    ngOnInit() {
        this.userService.getUsers().then(u => this.users = u);
    }

    drag(ev, val): void {
        ev.dataTransfer.setData("text/plain", ev.target.id);
        ev.dataTransfer.setData("valore", val);
    }

    drop(ev): void {
        var data = ev.dataTransfer.getData("text");
    }


}

