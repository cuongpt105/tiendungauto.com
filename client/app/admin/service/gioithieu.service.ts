import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable, Observer, Subject} from 'rxjs/Rx';
import {UploadFileService} from './upload-file.service';
import { AppSettings } from '../../util/app-setting';

import {GioiThieu} from '../model/gioithieu';
import {FileSystem} from '../model/file-system';


@Injectable() 
export class GioiThieuService {
    public gioithieuUrl: string = AppSettings.API_ENDPOINT +'/gioithieu';
    public gioithieuFileUrl: string = AppSettings.API_ENDPOINT + '/gioithieu/files';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadLoadFile(files: Array<File>): Observable<FileSystem[]> {
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === this.gioithieuFileUrl) {
                this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(this.gioithieuFileUrl, files);
    }

    deleteFile(gioithieuId: String, fileId: String): Observable<FileSystem[]> {
        let url = `${this.gioithieuUrl}/${gioithieuId}/files/${fileId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getGioiThieu() : Observable<GioiThieu> {
         return this.http.get(this.gioithieuUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveGioiThieu(gioithieu: GioiThieu) : Observable<GioiThieu> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
                    .post(this.gioithieuUrl, JSON.stringify(gioithieu), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log('An error occurred at gioi thieu service:', error);
        return Observable.throw(error.message || error);
    }
}