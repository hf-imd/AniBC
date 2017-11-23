import {Component, NgZone} from '@angular/core';
import {PouchdbService} from './pouchdb.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
    public people: Array<any>;
    public form: any;

    public constructor(private database: PouchdbService, private zone: NgZone) {
        this.people = [];
        this.form = {
            'username': '',
            'firstname': '',
            'lastname': ''
        };

      //  this.ngOnInit();
    }

    public ngOnInit() {
        this.database.sync('http://localhost:5984/anibc');
        this.database.getChangeListener().subscribe(data => {
            for (let i = 0; i < data.change.docs.length; i++) {
                this.zone.run(() => {
                    this.people.push(data.change.docs[i]);
                });
            }
        });
        this.database.fetch().then(result => {
            this.people = [];
            for (let i = 0; i < result.rows.length; i++) {
                this.people.push(result.rows[i].doc);
            }
        }, error => {
            console.error(error);
        });
    }

    public insert() {
        if (this.form.username && this.form.firstname && this.form.lastname) {

            console.log('insert ');

            this.database.put(this.form.username, this.form);

            // reset form inputs
            this.form = {
                'username': '',
                'firstname': '',
                'lastname': ''
            };
        }
    }}
