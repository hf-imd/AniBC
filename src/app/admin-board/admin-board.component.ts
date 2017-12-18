import {Component, NgZone, OnInit} from '@angular/core';
import {PouchdbService} from "../pouchdb.service";
import {AppComponent} from "../app.component";
import {UtilitiesService} from "../services/utilities.service";
import {ConfigService} from "../services/config.service";

@Component({
  selector: 'app-admin-board',
  templateUrl: './admin-board.component.html',
  styleUrls: ['./admin-board.component.scss']
})
export class AdminBoardComponent implements OnInit {
    public form: any;


  constructor(private database: PouchdbService, private zone: NgZone,  private config: ConfigService ) {


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

  ngOnInit() {
  }


    public insert() {

        console.log('insert:');
        console.log(this.form);
        console.log(this.config);
        if (this.form.anichar) {

            const random = UtilitiesService.getRandomIntInclusive(1000,9999);
            const id = this.config.prefix_char + this.form.anichar + '-' + random; // HACK: this is an bad idea.


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
}
