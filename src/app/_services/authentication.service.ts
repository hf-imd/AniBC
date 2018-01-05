import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {ConfigService} from "./config.service";
import {User} from "../_models/user";

interface LoginResponse {
    accessToken: string;
    accessExpiration: number;
    data: any;
    user: User;
    message: string;
    error: string;
    status: boolean,

}



@Injectable()
export class AuthenticationService {

    constructor(private http: HttpClient, private config: ConfigService) {

    }


    login(username: string, password: string) {

        let url = this.config.getPath() + '/api/users/';
        let body = {
            'username': username,
            'password': password };
        let headers = {'Content-Type': 'application/x-www-form-urlencoded'}; // ... Set content type to JSON
        let options = {headers: headers}; // Create a request option

      return this.http.post<LoginResponse>(url, body, options) // ...using post request
            .map(
                (loginResponse) => {

                    // login successful if there's a jwt token in the response
                    if (loginResponse && loginResponse.status === true) {

                        console.log('result', loginResponse);

                        if (loginResponse.user.token) {
                            console.log('Message : ', loginResponse.message);

                        } else {
                            console.log('Message : ', loginResponse.message);
                        }
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(loginResponse.user));
                    }
                    else if (loginResponse && loginResponse.status === false) {
                        console.log('Message : ', loginResponse.message);
                        console.log('Error : ', loginResponse.error);

                    }
                    return loginResponse;


                },
                error => {


                    console.log(JSON.stringify(error.json()));
                }
            )
    }




    /**
     *
     *
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
