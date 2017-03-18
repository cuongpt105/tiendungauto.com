import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import { AppSettings } from '../../util/app-setting';

import { Gallery } from '../model/gallery';


@Injectable() 
export class GalleryService {
    public galleryUrl: string = AppSettings.API_ENDPOINT +'/galleries';
    
    constructor(private http : Http){}


    deleteGallery(galleryId: String): Observable<Boolean> {
        let url = `${this.galleryUrl}/${galleryId}`;
        return this.http.delete(url)
                        .map(res => {res; return true})
                        .catch(this.handleError);
    }

    getGalleries() : Observable<Gallery[]> {
         return this.http.get(this.galleryUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveGallery(gallery: Gallery) : Observable<Gallery> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        if (gallery.id) {
            let url = `${this.galleryUrl}/${gallery.id}`;
             return this.http
                    .put(url, JSON.stringify(gallery), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        } else {
             return this.http
                    .post(this.galleryUrl, JSON.stringify(gallery), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        }
       
    }

    private handleError (error: any) {
        console.log('An error occurred at gallery service:', error);
        return Observable.throw(error.message || error);
    }
}