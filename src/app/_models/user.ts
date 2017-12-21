export interface User {
    id: number;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
    token?: string;

}

export class User {
    constructor(public id: number,
                public username: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public token?: string) {

        this.token = '';
    }
}

