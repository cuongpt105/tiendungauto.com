import { Component, OnInit, Input, ElementRef } from '@angular/core';

import { Gallery } from '../../admin/model/gallery';

declare var $:any;

@Component({
    selector: 'gallery-holder',
    templateUrl: './gallery-holder.html',
    styleUrls: ['./gallery-holder.css']
})

export class GalleryHolderComponent implements OnInit {
    
    private index: number;
    private numberItem: number;
    private itemThumbSize: number;
    private thumbDisplaySize: number;
    private currentGallery: Gallery;

    private isShowLeftBtnThumb: boolean;
    private isShowRightBtnThumb: boolean;

    @Input()
    private galleries: Gallery[];

    private totalGallery: number;
    
    constructor(
        private elementRef:ElementRef
    ) {}

    ngOnInit() {
        this.index = 0;
        this.totalGallery = 0;
        this.isShowLeftBtnThumb = true;
        this.isShowRightBtnThumb = true;

        this.getSizeOfImageThumb();
        this.currentGallery = new Gallery("", null, null);
        this.updateInitData(this.galleries);
        this.updateBtnThumb();
    }

    updateInitData(galleries: Gallery[]) {
        if (galleries && galleries.length > 0) {
            this.currentGallery = galleries[0];
            this.totalGallery = galleries.length;
        }
    }

    private getSizeOfImageThumb() {
        this.thumbDisplaySize = $(this.elementRef.nativeElement.querySelector('#owl-single-product-thumbnails > .owl-wrapper-outer')).width();
        this.getItemSize();
    }

    private getItemSize() {
        this.numberItem = this.thumbDisplaySize / 72;
        this.numberItem = this.numberItem + 0.5;
        this.numberItem = parseInt(""+this.numberItem);
        this.itemThumbSize = this.thumbDisplaySize/this.numberItem;
    }

    onSelectImageThumb(thumb: Gallery) {
        this.currentGallery = thumb;

        let indexFound = this.galleries.findIndex(gl => {
            return (gl === thumb);
        });

        if (indexFound) {
            //this.index = indexFound;
        }
    }

    onPreviousThumb() {
        if (this.index > 0) {
            this.index = this.index - 1;
        }

        this.updateBtnThumb();
    }

    onNextThumb() {
        if (this.index < (this.totalGallery - this.numberItem - 1)) {
            this.index = this.index + 1;
        }
        this.updateBtnThumb();
    }

    private updateBtnThumb() {
        this.isShowLeftBtnThumb = true;
        this.isShowRightBtnThumb = true;
        if (this.index === 0) {
            this.isShowLeftBtnThumb = false;
        }

        if (this.index >= (this.totalGallery - this.numberItem - 1)) {
            this.isShowRightBtnThumb = false;
        }

        if (this.totalGallery <= this.numberItem) {
            this.isShowLeftBtnThumb = false;
            this.isShowRightBtnThumb = false;
        }
    }
}