import { Injectable, EventEmitter } from '@angular/core';
import PouchDB from 'pouchdb';

@Injectable()
export class PouchdbService {

    private isInstantiated: boolean;
    private database: any;
    private listener: EventEmitter<any> = new EventEmitter();

    public constructor() {
        if (!this.isInstantiated) {
            this.database = new PouchDB('anibc');
            console.log(this.database.adapter); // prints either 'idb' or 'websql'

            this.isInstantiated = true;
        }
    }
    /**
     *
     *
     * @returns {any}
     */
    public fetch() {
        return this.database.allDocs({include_docs: true});

    }

    /**
     *
     * @param {string} id
     */
    public get(id: string) {
        return this.database.get(id);
    }

    /**
     *
     *
     * @param {string} id
     * @param document
     */
    public put(id: string, document: any) {

        console.log('id:' + id);
        // build id from form.username
        document._id = id;

        // is there already some Docomunt with this id in the DB ?
        return this.get(id).then(result => {
            document._rev = result._rev;
            return this.database.put(document);
        }, error => {

            // if not, put it in
            if (error.status == '404') {
                return this.database.put(document).then(function (response) {
                    // handle response
                }).catch(function (err) {
                    console.log(err);
                });

            } else {

                return new Promise((resolve, reject) => {
                    reject(error);
                });
            }
        });
    }

    /**
     *
     *
     * @param {string} remote
     */
    public sync(remote: string) {
        const remoteDatabase = new PouchDB(remote);
        this.database.sync(remoteDatabase, {
            live: true
        }).on('change', change => {
            this.listener.emit(change);
        });
    }

    /**
     *
     *
     * @returns {EventEmitter<any>}
     */
    public getChangeListener() {
        return this.listener;
    }
}

