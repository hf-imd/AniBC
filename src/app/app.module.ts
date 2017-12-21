import {RouterModule} from "@angular/router";
import {AppRoutingModule} from './app-routing.module';
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
import {DataService} from "./_services/data.service";
import {ConfigService} from "./_services/config.service";
import {FileUploadModule} from 'ng2-file-upload';
import {FileSizeModule} from 'ngx-filesize';
import {AlertComponent} from './_directives/alert/alert.component';
import {LoginComponent} from './login/login.component';


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
        AlertComponent,
        LoginComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFontAwesomeModule,
        FileUploadModule,
        FileSizeModule,
        AppRoutingModule,
        RouterModule.forRoot(routes)

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
