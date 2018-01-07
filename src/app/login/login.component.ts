import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AlertService} from "../_services/alert.service";
import {AuthenticationService} from "../_services/authentication.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private alertService: AlertService) {
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {

        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    // remove loading spinner
                    this.loading = false;

                    // login successful if there's a jwt token in the response
                    if (data && data.status === true) {

                        if ( !data.user.token || 0 === data.user.token.length ) {
                            this.alertService.success(data.message);
                            this.router.navigate([this.returnUrl]);
                        }
                    }
                    else if (data && data.status === false) {
                        this.alertService.error(data.message);
                    }

                },
                error => {
                    console.log(error);

                    this.alertService.error('Fehler beim Login (2)');
                });
    }

    fillinForm(name) {


        this.model.username = name;
        this.model.password = name;
        this.login();
    }
}
