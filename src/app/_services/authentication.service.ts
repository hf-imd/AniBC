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
     * @param {string} username
     * @param {string} password
     * @returns {Observable<any | undefined>}
     */
    login2(username: string, password: string) {
        let url = this.config.getPath() + '/api/users/';

        console.log('login', url);


        console.log('login username', username);
        console.log('login password', password);

        let urlSearchParams = new URLSearchParams();
        urlSearchParams.append('username', username);
        urlSearchParams.append('password', password);


        return this.http.post<any>(url, {

            params: {
                'username': username,
                'password': password
            }
        }, {

            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).map(
            (data) => {

                // login successful if there's a jwt token in the response
                if (data && data.status === true) {

                    console.log('result', data);
                    if (data.user.token) {
                        console.log('Message : ', data.message);

                    } else {
                        console.log('Message : ', data.message);
                    }
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(data.user));
                }
                else if (data && data.status === false) {
                    console.log('Message : ', data.message);
                    console.log('Error : ', data.error);

                }
                return data;


            },
            error => {


                console.log(JSON.stringify(error.json()));
            }
        )


    };


    /**
     *
     *
     */
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
