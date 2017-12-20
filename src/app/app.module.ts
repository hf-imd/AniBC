import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {PouchdbService} from './pouchdb.service';
import {AlphabetListComponent} from './alphabet-list/alphabet-list.component';
import {AuthorsListComponent} from './authors-list/authors-list.component';
import {UploadFormComponent} from './upload-form/upload-form.component';
import {AdminBoardComponent} from './admin-board/admin-board.component';
import {MovieCanvasComponent} from './movie-canvas/movie-canvas.component';
import {NavigationComponent} from './navigation/navigation.component';
import {FooterComponent} from './footer/footer.component';
import {AngularFontAwesomeModule} from "angular-font-awesome/out-tsc/lib-es2015";
import {DataService} from "./services/data.service";
import {ConfigService} from "./services/config.service";
import {FileUploadModule} from 'ng2-file-upload';
import {FileSizeModule} from 'ngx-filesize';


@NgModule({
    declarations: [
        AppComponent,
        AlphabetListComponent,
        AuthorsListComponent,
        UploadFormComponent,
        AdminBoardComponent,
        MovieCanvasComponent,
        NavigationComponent,
        FooterComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFontAwesomeModule,
        FileUploadModule,
        FileSizeModule,
    ],
    providers: [
        PouchdbService,
        DataService,
        ConfigService,

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
