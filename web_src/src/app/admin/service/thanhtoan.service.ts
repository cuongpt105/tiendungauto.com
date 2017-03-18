import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable, Subject} from 'rxjs/Rx';
import {UploadFileService} from './upload-file.service';
import { AppSettings } from '../../util/app-setting';

import {ThanhToan} from '../model/thanhtoan';
import {FileSystem} from '../model/file-system';


@Injectable() 
export class ThanhToanService {
    public thanhtoanUrl: string = AppSettings.API_ENDPOINT +'/thanhtoan';
    public thanhtoanFileUrl: string = AppSettings.API_ENDPOINT + '/thanhtoan/files';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadLoadFile(files: Array<File>): Observable<FileSystem[]> {
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === this.thanhtoanFileUrl) {
                this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(this.thanhtoanFileUrl, files);
    }

    deleteFile(thanhtoanId: String, fileId: String): Observable<FileSystem[]> {
        let url = `${this.thanhtoanUrl}/${thanhtoanId}/files/${fileId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getThanhToan() : Observable<ThanhToan> {
         return this.http.get(this.thanhtoanUrl)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    saveThanhToan(thanhtoan: ThanhToan) : Observable<ThanhToan> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http
                    .post(this.thanhtoanUrl, JSON.stringify(thanhtoan), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log('An error occurred at dich vu service:', error);
        return Observable.throw(error.message || error);
    }
}