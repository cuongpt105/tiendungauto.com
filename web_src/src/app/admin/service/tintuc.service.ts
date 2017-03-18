import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import { AppSettings } from '../../util/app-setting';

import {TinTuc} from '../model/tintuc';

@Injectable() 
export class TinTucService {
    public tintucUrl: string = AppSettings.API_ENDPOINT +'/tintuc';
    
    constructor(private http : Http){}


    deleteTinTuc(tintucId: String): Observable<TinTuc[]> {
        let url = `${this.tintucUrl}/${tintucId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getTinTucs() : Observable<TinTuc[]> {
         return this.http.get(this.tintucUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveTinTuc(tintuc: TinTuc) : Observable<TinTuc> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (tintuc.id) {
            let url = `${this.tintucUrl}/${tintuc.id}`;
             return this.http
                    .put(url, JSON.stringify(tintuc), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        } else {
             return this.http
                    .post(this.tintucUrl, JSON.stringify(tintuc), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        }
       
    }

    private handleError (error: any) {
        console.log('An error occurred at tin tuc service:', error);
        return Observable.throw(error.message || error);
    }
}