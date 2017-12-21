import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";


import {User} from '../_models/user';

@Injectable()

export class UserService {
    constructor(private http: HttpClient, private config: ConfigService) {

    }
    public getAll(){
        return this.http.get<User[]>(this.config.localpath+'/api/users/');

    }

    getById(id: number) {
        return this.http.get(this.config.localpath+'/api/users/' + id);
    }

    create(user: User) {
        return this.http.post(this.config.localpath+'/api/users/', user);
    }

    update(user: User) {
        return this.http.put(this.config.localpath+'/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.config.localpath+'/api/users/' + id);
    }

}