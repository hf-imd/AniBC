/**
 *
 *
 *  File Upload:
 * https://github.com/valor-software/ng2-file-upload
 *
 *
 */
import {Component, NgZone} from '@angular/core';
import {ConfigService} from "../services/config.service";
import {Anichar} from "../anichar";
import {UUID} from 'angular2-uuid';
import {DataService} from "../services/data.service";
import {FileUploader} from 'ng2-file-upload';
import {forEach} from "@angular/router/src/utils/collection";


// const URL = '/api/';
const URL = 'http://anibc.local/api/upload.php';


@Component({
    selector: 'app-admin-board',
    templateUrl: './admin-board.component.html',
    styleUrls: ['./admin-board.component.scss']

})
export class AdminBoardComponent {
    public anichars: any;
    public model: Anichar;
    public submitted = false;
    public hasBaseDropZoneOver: boolean = false;
    public uploader: FileUploader = new FileUploader({url: URL});
    public feedback: any;
    public filestatus: boolean = true;
    public pdf_file: number = 0;
    public video_file: number = 0;
    public dropzoneinfo: any = [];


    constructor(private dataService: DataService, private zone: NgZone, private config: ConfigService) {

        this.anichars = config.anichars;
        let uuid = UUID.UUID();
        this.model = new Anichar('temp-' + uuid);
        this.dropzoneinfo = [
            'hier Video (.mp4) hinzufügen',
            'hier PDF hinzufügen',
        ]


    }


    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }


    public checkFiles($event) {

        console.log('checkFiles');

        let status: boolean = false;
        let message: any = [];


        if (this.uploader.queue) {

            // empty message
            message.length = 0;
            this.feedback = 0;

            let dropzoneinfo = this.dropzoneinfo;


            this.uploader.queue.forEach(function (item, index) {



                // check if size is ok
                // not more then 2 MB : 2097152 Byte
                if (item.file.size > 2097152) {
                    status = false;
                    message.push('Die Datei ist zu gross');
                }

                let type: string = item.file.type;
                switch (type) {

                    case  "video/mp4":
                        status = true;
                        dropzoneinfo[0] = 'Video OK';

                        break;

                    case  "application/pdf":
                        dropzoneinfo[1] = 'PDF OK';
                        status = true;
                        break;


                    default:
                        status = false;
                        message.push('Die Datei ist weder ein PDF noch ein mp4');
                        break;

                }

                // remove file from list if not ok
                if (status === false) {
                    item.remove();
                }

            });
            this.feedback = message;
            this.dropzoneinfo = dropzoneinfo;
            console.log(message);

        }

    }

    public onSubmit() {


        this.submitted = true;


        //  this.uploader.uploadAll();


        if (this.model.version == '') {
            this.model.version = '1';
        }

        if (this.model.anichar) {

            let uuid = UUID.UUID();
            const id = this.config.prefix_char + this.model.anichar + '-v_' + this.model.version + '-' + uuid; // HACK: this is an bad idea.


            //  this.dataService.put(id, this.model);


        }
    }
}
