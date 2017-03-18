import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable, Subject} from 'rxjs/Rx';
import {UploadFileService} from './upload-file.service';
import { AppSettings } from '../../util/app-setting';

import {TinTucFile} from '../model/tintucfile';


@Injectable() 
export class TinTucFileService {
    public tintucfileUrl: string = AppSettings.API_ENDPOINT +'/tintucfile';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadLoadFile(files: Array<File>): Observable<TinTucFile[]> {
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === this.tintucfileUrl) {
                this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(this.tintucfileUrl, files);
    }

    deleteFile(tintucfileId: String): Observable<TinTucFile[]> {
        let url = `${this.tintucfileUrl}/${tintucfileId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getTinTucFiles() : Observable<TinTucFile[]> {
         return this.http.get(this.tintucfileUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log('An error occurred at tin tuc file service:', error);
        return Observable.throw(error.message || error);
    }
}