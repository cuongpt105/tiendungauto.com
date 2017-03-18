import { Injectable } from '@angular/core';

import {Observable, Observer, Subject} from 'rxjs/Rx';
import {BroadcastEvent} from '../model/broadcast-event';

@Injectable() 
export class UploadFileService {
    public percentUploaded = new Subject<BroadcastEvent>();

    constructor () {}

    uploadFile(url: string, files: Array<File>): Observable<any> {
        return Observable.create((observer: Observer<any>) => {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            for(var i = 0; i < files.length; i++) {
                formData.append("file-upload", files[i], files[i].name);
            }
			
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };

            xhr.upload.onprogress = (event) => {
                let process: number = Math.round(event.loaded / event.total * 100);
                let dataProcess : BroadcastEvent = {key: url, data: process};
                this.percentUploaded.next(dataProcess);
            };

            xhr.open("POST", url, true);
			
            xhr.send(formData);
        });
    }
}