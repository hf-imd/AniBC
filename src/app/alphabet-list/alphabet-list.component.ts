import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-alphabet-list',
    templateUrl: './alphabet-list.component.html',
    styleUrls: ['./alphabet-list.component.scss']
})
export class AlphabetListComponent implements OnInit {

    public alphabet: Array<any>;

    constructor() {
    }

    ngOnInit() {
        this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '!', '?', ';', ':'];
    }

}
