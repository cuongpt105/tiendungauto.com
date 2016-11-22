import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'rating-view',
    templateUrl: './rating-view.html',
    styleUrls: ['./rating-view.css']
})

export class RatingViewComponent {
    @Input()
    private value: number;
    
    constructor() {

    }
}