import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { HeaderInfo } from '../../models/header-info';
import { MenuItem } from '../../models/menu-item';
import { BreadCrumbInfo } from '../../models/bread-crumb-info'
import { Product } from '../../admin/model/product';
import { Gallery } from '../../admin/model/gallery';
import { DanhMuc } from '../../admin/model/danhmuc';

import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { DanhMucBroadcast } from '../../broadcast/danh-muc-broadcast.service';
import { ProductService } from '../../admin/service/product.service';
import { GalleryUtil } from '../../util/gallery-util';

@Component({
    selector: 'product',
    templateUrl: './product.html',
    styleUrls: ['./product.css']
})

export class ProductComponent implements OnInit{
    private productId: string;
    private product: Product;
    private galleries: Gallery[];
    private quantityInformation: string;
    private quantityValue: number;
    private productRating: number;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private infoCommonHandle: InformationCommonHandle,
        private danhMucBroadcast: DanhMucBroadcast
    ){}

    ngOnInit() {
        this.productRating = 4;
        this.product = new Product();
        this.quantityInformation = "";
        this.galleries = [];

        this.route.params.forEach((params: Params) => {
            this.productId = params['id'];
            
            this.productService.getProductById(this.productId)
                .subscribe(product => {
                    this.product = product;
                    this.galleries = GalleryUtil.convertToGalleryFromProduct(product);
                    this.updateInformationCommon();
                });
        });
    }

    addToCart() {

    } 

    onChangeRating(ratingValue) {
        
    }

    private updateInformationCommon() {
        this.infoCommonHandle
            .init()
            .addMenuItem(new MenuItem("","",""))
            .addHeaderInfo(this.getHeaderInfo())
            .addBreadCrumbs(this.getBreadCrumbInfo())
            .fireUpdateData();
    }

    private getHeaderInfo(): HeaderInfo {
        let title: string = ""+this.product.seoTitle;
        let keyword: string = ""+this.product.seoKeyword;
        let description: string = ""+this.product.seoDescription;

        let headerInfo = new HeaderInfo("", title, keyword, description);
        return headerInfo;
    }

    private getBreadCrumbInfo(): BreadCrumbInfo[] {
        let dms = this.getDanhMucsRelation(this.product.danhmuc);
        dms = dms.sort((a,b) => {
            if (a.level < b.level) return -1;
            if (a.level > b.level) return 1;
            return 0;
        });

        let breadcrumbs: BreadCrumbInfo[] = [];
        for (let dm of dms) {
            let link: string = "/danh-muc/"+dm.id;
            let value: string = ""+dm.name;
            let breadcrumb = new BreadCrumbInfo(link, value);
            breadcrumbs.push(breadcrumb);
        }

        let link: string = "/san-pham/"+this.product.id;
        let value: string = ""+this.product.name;
        let breadcrumb = new BreadCrumbInfo(link, value);
        breadcrumbs.push(breadcrumb);
        return breadcrumbs;
    }

    private getDanhMucsRelation(danhMuc: DanhMuc): DanhMuc[] {
        let result: DanhMuc[] = [danhMuc];
        let danhMucsFromStorage: DanhMuc[] = [];

        let isValid = true;
        while (isValid) {       // this block to get danh-muc from strorage
            if (localStorage.getItem("danhmucs") != null) {
                danhMucsFromStorage = JSON.parse(localStorage.getItem("danhmucs"));
                isValid = false;
            }
        }

        let dmTemp = danhMuc;
        isValid = true;
        while (isValid) {
            if (dmTemp.parentId) {
                let filters = danhMucsFromStorage.filter(dm => dm.id === dmTemp.parentId);
                if (filters && filters.length > 0) {
                    result.push(filters[0]);
                    dmTemp = filters[0];
                } else {
                    isValid = false;
                }
            } else {
                isValid = false;
            }
        }

        return result;
    }
}