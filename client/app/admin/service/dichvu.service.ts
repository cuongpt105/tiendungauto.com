import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable, Observer, Subject} from 'rxjs/Rx';
import {UploadFileService} from './upload-file.service';
import { AppSettings } from '../../util/app-setting';

import {DichVu} from '../model/dichvu';
import {FileSystem} from '../model/file-system';


@Injectable() 
export class DichVuService {
    public dichvuUrl: string = AppSettings.API_ENDPOINT +'/dichvu';
    public dichvuFileUrl: string = AppSettings.API_ENDPOINT + '/dichvu/files';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadLoadFile(files: Array<File>): Observable<FileSystem[]> {
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === this.dichvuFileUrl) {
                this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(this.dichvuFileUrl, files);
    }

    deleteFile(dichvuId: String, fileId: String): Observable<FileSystem[]> {
        let url = `${this.dichvuUrl}/${dichvuId}/files/${fileId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getDichVu() : Observable<DichVu> {
         return this.http.get(this.dichvuUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveDichVu(dichvu: DichVu) : Observable<DichVu> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
                    .post(this.dichvuUrl, JSON.stringify(dichvu), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log('An error occurred at dich vu service:', error);
        return Observable.throw(error.message || error);
    }
}