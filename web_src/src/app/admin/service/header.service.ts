import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable, Subject} from 'rxjs/Rx';
import {UploadFileService} from './upload-file.service';
import { AppSettings } from '../../util/app-setting';
import {Header} from '../model/header';

@Injectable() 
export class HeaderService {
    public headerUrl: string = AppSettings.API_ENDPOINT +'/headers';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadHeader(files: Array<File>): Observable<Header> {
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === this.headerUrl) {
                this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(this.headerUrl, files);
    }

    getHeader() : Observable<Header> {
         return this.http.get(this.headerUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    private handleError (error: any) {
        //console.log('An error occurred', error);
        return Observable.throw(error.message || error);
    }
}