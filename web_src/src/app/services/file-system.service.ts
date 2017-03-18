import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable, Subject} from 'rxjs/Rx';
import {UploadFileService} from '../admin/service/upload-file.service';
import { AppSettings } from '../util/app-setting';

import {FileSystem} from '../admin/model/file-system';


@Injectable() 
export class FileSystemService {
    public fileUrl: string = AppSettings.API_ENDPOINT +'/files';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadLoadFile(files: Array<File>): Observable<FileSystem[]> {
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === this.fileUrl) {
                this.percentUploaded.next(data.data);
            }
        });
        
        return this.uploadFileService.uploadFile(this.fileUrl, files);
    }

    deleteFile(fileId: String): Observable<Boolean> {
        let url = `${this.fileUrl}/${fileId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log('An error occurred at file system service:', error);
        return Observable.throw(error.message || error);
    }
}