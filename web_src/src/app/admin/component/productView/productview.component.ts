import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { Product } from '../../model/product';

@Component({
    selector: 'product-view',
    templateUrl: "./productview.component.html",
    styleUrls: ['./productview.component.css']
})

export class ProductViewComponent implements OnInit {
    @Input()
    private product: Product;

    @Output()
    private onBackProducts: EventEmitter<Product> = new EventEmitter<Product>();

    constructor(){}

    ngOnInit() {}

    backProducts() {
        this.onBackProducts.emit(this.product);
    }
}
