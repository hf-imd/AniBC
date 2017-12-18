import {Injectable, NgZone} from '@angular/core';
import {PouchdbService} from "../pouchdb.service";
import {ConfigService} from "./config.service";

@Injectable()
export class DataService {

    private database: PouchdbService;
    private zone: NgZone;
    private config : ConfigService;

    constructor() {

        //  this.database.sync('https://www:imd2017@anibc.smileupps.com/anibc');
        this.database.sync('http://127.0.0.1:5984/anibc');
        this.database.getChangeListener().subscribe(data => {
            for (let i = 0; i < data.change.docs.length; i++) {
                this.zone.run(() => {
                    this.config.anichars.push(data.change.docs[i]);
                });
            }
        });
        this.database.fetch().then(result => {
            this.config.anichars = [];
            for (let i = 0; i < result.rows.length; i++) {
                this.config.anichars.push(result.rows[i].doc);
            }
        }, error => {
            console.error(error);
        });
    }

}
