import {RouterModule, Routes} from "@angular/router";
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
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import { AdminComponent } from './admin/admin.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./_helpers/auth.guard";
import {UserService} from "./_services/user.service";
import {JwtInterceptor} from "./_helpers/jwt.interceptor";
import {OAuthModule} from "angular-oauth2-oidc";

const AppRoutes: Routes = [
    {
        path: 'anibc',
        component: MovieCanvasComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'admin',
        component: AdminBoardComponent
    }
];


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
        AdminComponent,

    ],
    imports: [
        BrowserModule,
        FormsModule,
        AngularFontAwesomeModule,
        FileUploadModule,
        FileSizeModule,
        RouterModule.forRoot(AppRoutes),
        HttpClientModule,
        OAuthModule.forRoot()



    ],
    providers: [
        PouchdbService,
        DataService,
        ConfigService,
        AlertService,
        AuthenticationService,
        AuthGuard,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
