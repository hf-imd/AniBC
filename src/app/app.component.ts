import {Component, NgZone} from '@angular/core';
import {PouchdbService} from './pouchdb.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AniBC';


    public constructor( private database: PouchdbService, private zone: NgZone ) {




    }

    public ngOnInit() {

    }




}

