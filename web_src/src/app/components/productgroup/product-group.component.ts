import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

import { Product } from '../../admin/model/product';
import { FieldSort } from '../../models/field-sort';

@Component({
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

    constructor(){
        
    }

    ngOnInit() {
        this.isShowSort;
        this.title;
        this.total;
        this.limit;
        this.currentPage;
        this.products;
        
        this.fieldsSort = this.getFieldsSortData();
        this.currentFieldSort = this.fieldsSort[0];
    }

    private getFieldsSortData() {
        let  fieldsSort: FieldSort[] = [];
        let dateSort: FieldSort = new FieldSort("date desc", "Sản phẩm mới nhất");
        let priceNewSort: FieldSort = new FieldSort("price desc", "Giá cao đến thấp");
        let priceOldSort: FieldSort = new FieldSort("price", "Giá thấp đến cao");
        fieldsSort.push(dateSort);
        fieldsSort.push(priceNewSort);
        fieldsSort.push(priceOldSort);

        return fieldsSort;
    }

    detailProduct(product: Product) {
        product;
    }

    sortFieldChange(field: FieldSort) {
        this.currentFieldSort = field;
        this.onSortChange.emit(this.currentFieldSort.name);
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
        product;
    }

    addToWishlist(product: Product) {
        product;
    }

    addToCompare(product: Product) {
        product;
    }
}