import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProductImage } from '../../model/productimage' 
import { FileSystem } from '../../model/file-system';

import { CommonBroadcast } from '../../service/common-broadcast.service';

@Component ({
    selector: 'product-image-detail',
    templateUrl: './productImageDetail.component.html',
    styleUrls: ['./productImageDetail.component.css']
})

export class ProductImageDetailComponent implements OnInit{
    @Input()
    private imagesSelected: FileSystem[];
    
    @Input()
    private productImages: ProductImage[];

    @Output()
    private onDataChange: EventEmitter<FileSystem[]> = new EventEmitter<FileSystem[]>();

    private imagesNotSelected: ProductImage[];
    constructor(private commonBroadcast: CommonBroadcast<ProductImage[]>){}

    ngOnInit(){
        this.updateImageAfterChange();

        this.commonBroadcast.triggerBroadcast().subscribe(productImages => {
            this.productImages = productImages;
            this.updateImageAfterChange();
        });
    }

    updateImageAfterChange() {
        this.imagesNotSelected = this.productImages.filter(image => {
            let index = this.imagesSelected.findIndex(img => img.id === image.file.id);
            if (index >= 0) {
                return false;
            } else {
                return true;
            }
        });
    }

    removeImage(image: FileSystem) {
        this.imagesSelected = this.imagesSelected.filter(imageSelected => imageSelected.id !== image.id);
        this.updateImageAfterChange();
        this.onDataChange.emit(this.imagesSelected);
    }

    addImage(productImage: ProductImage) {
        this.imagesSelected.push(productImage.file);
        this.updateImageAfterChange();
        this.onDataChange.emit(this.imagesSelected);
    }
}