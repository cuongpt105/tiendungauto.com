import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'rating',
    templateUrl: './rating.html',
    styleUrls: ['./rating.css']
})

export class RatingComponent {
    @Input()
    private value: number;

    @Input()
    private numberTimeRating: number;

    @Output()
    private onRating: EventEmitter<number> = new EventEmitter<number>();
    
    constructor() {

    }

    onChangeRating(value: number) {
        this.onRating.emit(value);
    }
}