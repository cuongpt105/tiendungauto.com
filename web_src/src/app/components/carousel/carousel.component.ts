import { Component, Input, OnInit, AfterViewInit, ElementRef, NgZone } from '@angular/core';

import { Gallery } from '../../models/gallery';

declare var $:any;

@Component({
    selector: 'carousel',
    templateUrl: './carousel.html',
    styleUrls: ['./carousel.css']
})

export class CarouselComponent implements OnInit, AfterViewInit {
    @Input()
    private carousels: Gallery[];

    @Input()
    private total: number;

    private itemSize: number;
    private index: number;
    private current: Gallery;
    private arrowTop: number;
    private bulletNavigateLeft: number;
    private isDisplayCarousel: boolean;
    private interval: any;

    constructor(
        private elementRef:ElementRef,
        private _ngZone: NgZone
    ) {}

    ngOnInit() {
        this.index = 0;
        this.arrowTop = 10;
        this.bulletNavigateLeft = 0;
        this.itemSize = 0;
        this.isDisplayCarousel = false;
        this.current = new Gallery("", "", "", "");
        this.getSizeOfItem();
    }

    ngAfterViewInit() {
        setTimeout(() => this.updateLayoutAfterContentLoaded(), 200);
    }

    onSelectBulletItem(item: Gallery) {
        this.current = item;

        let indexFound = this.carousels.findIndex(gl => {
            return (gl === item);
        });

        if (indexFound >= 0) {
            this.index = indexFound;
        }
        this.updateCarouselInterval();
    }

    onPreviousItem() {
        if (this.index === 0) {
            this.index = this.carousels.length - 1;
        } else {
            this.index = this.index - 1;
        }
        this.updateCarouselInterval();
    }

    onNextItem() {
        if (this.index === (this.carousels.length - 1)) {
            this.index = 0;
        } else {
            this.index = this.index + 1;
        }
        this.updateCarouselInterval();
    }

    private getSizeOfItem() {
        this.itemSize = $(this.elementRef.nativeElement.querySelector('.carousel-container > .carousel-content')).width();
        this.isDisplayCarousel = true;
    }

    private updateLayoutAfterContentLoaded() {
        // check to display carousel and calculate arrow top
        let hightItem: number = $(this.elementRef.nativeElement.querySelector('.carousel-container > .carousel-content')).height();
        this.bulletNavigateLeft = (this.itemSize/2) - (20*this.total/2);
        this.arrowTop = (hightItem/2) - (40/2);
        this.updateCarouselInterval();
    }

    private updateCarouselInterval() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = setInterval(() => this.onNextItem(), 3000);
    }
}