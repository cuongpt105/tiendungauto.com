import { Component, Input } from '@angular/core';

@Component({
    selector: 'rating-view',
    templateUrl: './rating-view.html',
    styleUrls: ['./rating-view.css']
})

export class RatingViewComponent {
    @Input()
    private value: number;
    
    constructor() {
        this.value;
    }
}