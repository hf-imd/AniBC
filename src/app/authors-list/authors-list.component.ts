import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-authors-list',
    templateUrl: './authors-list.component.html',
    styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

    public authors: Array<string>;

    constructor() {
    }

    ngOnInit() {

        this.authors = ['Hans', 'Fritz', 'Sofie'];
    }

}
