import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import { AppSettings } from '../../util/app-setting';

import {BanDo} from '../model/bando';

@Injectable() 
export class BanDoService {
    public bandoUrl: string = AppSettings.API_ENDPOINT +'/bando';
    
    constructor(private http : Http){}

    getBanDos() : Observable<BanDo[]> {
         return this.http.get(this.bandoUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    deleteBanDo(bandoId: String): Observable<BanDo[]> {
        let url = `${this.bandoUrl}/${bandoId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveBanDo(bando: BanDo) : Observable<BanDo> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (bando.id) {
            let url = `${this.bandoUrl}/${bando.id}`;
             return this.http
                    .put(url, JSON.stringify(bando), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        } else {
             return this.http
                    .post(this.bandoUrl, JSON.stringify(bando), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        }
       
    }

    private handleError (error: any) {
        console.log('An error occurred at tin tuc service:', error);
        return Observable.throw(error.message || error);
    }
}