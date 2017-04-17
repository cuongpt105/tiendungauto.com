import {Component, OnInit} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { DanhMuc } from '../../model/danhmuc';
import { Product } from '../../model/product';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';
import { ProductService} from '../../service/product.service';
import { DanhMucService } from '../../service/danhmuc.service';
import { DanhMucUtil } from '../../../util/danh-muc-util';

@Component({
    selector: 'product',
    templateUrl: "./product.component.html",
    styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {
    private currentItem: SideBarItem;

    private danhmucs: DanhMuc[];
    private products: Product[];

    private danhmucSelection: DanhMuc;
    private product: Product;
    
    private isCreate: Boolean;
    private isHideList: Boolean;
    private isView: Boolean;
    private allowCreate: Boolean;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sidebarItemService: SideBarItemService,
        private danhmucService: DanhMucService,
        private productService: ProductService){}

    ngOnInit() {
        this.currentItem = this.sidebarItemService.getItemByName('sanpham');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
        this.allowCreate = false;

        this.danhmucs = [];
        this.products = [];

        this.danhmucService.getDanhMucs().subscribe(dms => {   
            this.danhmucs = DanhMucUtil.convertTreeDMToListDM(dms);
        });
    }

    selectDanhMuc(danhmuc: DanhMuc) {
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
        this.allowCreate = false;
        this.danhmucSelection = danhmuc;

        let hasChildren = danhmuc.children && danhmuc.children.length > 0;
        if (!hasChildren) {
            this.allowCreate = true;
            this.productService.getProducts(danhmuc.id).subscribe(products => this.products = products);
        } else {
            this.products = [];
        }
    }

    addProduct() {
        this.isView = false;
        this.isCreate = true;
        this.isHideList = true;
        this.product = new Product();
        this.product.danhmuc = this.danhmucSelection;
    }

    saveProduct(product: Product) {
        this.productService.saveProduct(product).subscribe(
            pd => {
                if (this.isCreate) {
                    this.products = this.productService.addProductInList(this.products, pd);
                } else {
                    this.products = this.productService.updateProductInList(this.products, pd);
                }
                this.isView = false;
                this.isCreate = false;
                this.isHideList = false;
            },

            err => {
                console.log("==========Error during save product:"+err);
            }
        );
    }

    cancelProduct(product: Product) {
        product;
        this.product = null;
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
    }

    backProducts(product: Product) {
        product;
        this.product = null;
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
    }

    viewProduct(product: Product) {
        this.isView = true;
        this.isCreate = false;
        this.isHideList = true;
        this.product = product;
    }

    editProduct(product: Product) {
        this.isView = false;
        this.isCreate = false;
        this.isHideList = true;
        this.product = Object.assign(product);
    }

    deleteProduct(product: Product) {
        this.isView = false;
        this.isCreate = false;
        this.isHideList = false;
        this.productService.deleteProduct(product.id).subscribe(products => this.products = products);
    }
}
