import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import {Observable, Subject} from 'rxjs/Rx';
import {UploadFileService} from './upload-file.service';
import { AppSettings } from '../../util/app-setting';

import {ProductImage} from '../model/productimage';


@Injectable() 
export class ProductImageService {
    private productUrl: String = AppSettings.API_ENDPOINT + '/product';
    private productImageUrl: string = 'product-image';
    public percentUploaded = new Subject<number>();
    
    constructor(private uploadFileService: UploadFileService,
        private http : Http){}

    uploadLoadFile(productId: String, files: Array<File>): Observable<ProductImage[]> {
        let url = `${this.productUrl}/${productId}/${this.productImageUrl}`;
        this.uploadFileService.percentUploaded.subscribe(data => {
            if (data.key === url) {
                this.percentUploaded.next(data.data);
            }
        });
        return this.uploadFileService.uploadFile(url, files);
    }

    deleteFile(productImageId: String): Observable<ProductImage[]> {
        let url = `${AppSettings.API_ENDPOINT}/${this.productImageUrl}/${productImageId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getProductImages(productId: String) : Observable<ProductImage[]> {
        let url = `${this.productUrl}/${productId}/${this.productImageUrl}`;
         return this.http.get(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    private handleError (error: any) {
        console.log('An error occurred at product image service:', error);
        return Observable.throw(error.message || error);
    }
}