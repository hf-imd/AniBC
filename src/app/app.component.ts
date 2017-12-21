import {Component, NgZone} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {AlertService} from "./_services/alert.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AniBC';


    public constructor() {

    }


}

