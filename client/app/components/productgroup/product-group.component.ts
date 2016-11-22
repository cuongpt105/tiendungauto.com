import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../admin/model/product';
import { FieldSort } from '../../models/field-sort';

@Component({
    moduleId: module.id,
    selector: 'product-group',
    templateUrl: './product-group.html',
    styleUrls: ['./product-group.css']
})

export class ProductGroupComponent implements OnInit {

    @Input()
    private isShowSort: boolean;

    @Input()
    private title: string;

    @Input()
    private total: number;

    @Input()
    private limit: number;

    @Input()
    private currentPage: number;

    @Input()
    private products: Product[];

    @Output()
    private onSortChange: EventEmitter<String> = new EventEmitter<String>();

    @Output()
    private onPageChange: EventEmitter<number> = new EventEmitter<number>();

    private fieldsSort: FieldSort[];
    private currentFieldSort: FieldSort;
    private isDescendant

    constructor(){

    }

    ngOnInit() {
        this.isDescendant = true;
        this.fieldsSort = this.getFieldsSortData();
        this.currentFieldSort = this.fieldsSort[0];
    }

    private getFieldsSortData() {
        let  fieldsSort: FieldSort[] = [];
        let dateSort: FieldSort = new FieldSort("date", "Ngày");
        let priceSort: FieldSort = new FieldSort("price", "Giá");
        fieldsSort.push(dateSort);
        fieldsSort.push(priceSort);

        return fieldsSort;
    }

    detailProduct(product: Product) {

    }

    sortFieldChange(field: FieldSort) {
        this.currentFieldSort = field;
        if (this.isDescendant) {
            this.onSortChange.emit(this.currentFieldSort.name + " desc");
        } else {
            this.onSortChange.emit(this.currentFieldSort.name);
        }
    }

    sortChange() {
        this.isDescendant = !this.isDescendant;
        this.sortFieldChange(this.currentFieldSort);
    }

    pageChange(event) {
        //event.first = Index of the first record
        //event.rows = Number of rows to display in new page
        //event.page = Index of the new page
        //event.pageCount = Total number of pages
        this.onPageChange.emit(event.page);
    }

    addToCart(product: Product) {
        ///gio-hang/{{product.id}}
    }

    addToWishlist(product: Product) {

    }

    addToCompare(product: Product) {

    }
}