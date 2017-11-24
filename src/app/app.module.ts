import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {PouchdbService} from './pouchdb.service';
import {AlphabetListComponent} from './alphabet-list/alphabet-list.component';
import {AuthorsListComponent} from './authors-list/authors-list.component';
import { UploadFormComponent } from './upload-form/upload-form.component';
import { AdminBoardComponent } from './admin-board/admin-board.component';


@NgModule({
    declarations: [
        AppComponent,
        AlphabetListComponent,
        AuthorsListComponent,
        UploadFormComponent,
        AdminBoardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [PouchdbService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
