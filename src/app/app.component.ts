import {Component, NgZone} from '@angular/core';
import {PouchdbService} from './pouchdb.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'AniBC';
    public anichars: Array<any>;
    public form: any;
    public prefix_char: string;
    public allchairs: Array<any>;

    public constructor( private database: PouchdbService, private zone: NgZone ) {

        this.allchairs = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '?', ';', ':'];

        this.anichars = [];
        this.prefix_char = 'char-';
        this.form = {
            // Prefix
            // ID : Prefix-Buchstabe-Zahl
            // Buchstabe
            // Author
            // Dateiname
            // version
            'id': '',
            'anichar': '',
            'author': '',
            'version': '',
            'filename_movie': '', // .mp4
            'filename_doku': '' // .pdf (A4 hoch)
        };

    }

    public ngOnInit() {
        //  this.database.sync('https://www:imd2017@anibc.smileupps.com/anibc');
        this.database.sync('http://127.0.0.1:5984/anibc');
        this.database.getChangeListener().subscribe(data => {
            for (let i = 0; i < data.change.docs.length; i++) {
                this.zone.run(() => {
                    this.anichars.push(data.change.docs[i]);
                });
            }
        });
        this.database.fetch().then(result => {
            this.anichars = [];
            for (let i = 0; i < result.rows.length; i++) {
                this.anichars.push(result.rows[i].doc);
            }
        }, error => {
            console.error(error);
        });
    }

    public insert() {

        console.log('insert:');
        console.log(this.form);
        if (this.form.anichar) {

            const random = this.getRandomIntInclusive(1000, 9999);
            const id = this.prefix_char + this.form.anichar + '-' + random; // Todo: this is an bad idea.

            this.database.put(id, this.form);

            // reset form inputs
            this.form = {
                'id': '',
                'char': '',
                'author': '',
                'filename': '',
                'version': ''
            };
        }
    }

    public getRandomIntInclusive( min: number, max: number ) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

