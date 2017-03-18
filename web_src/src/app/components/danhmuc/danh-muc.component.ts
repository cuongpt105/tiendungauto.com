import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { DanhMuc } from '../../admin/model/danhmuc';
import { HeaderInfo } from '../../models/header-info';
import { MenuItem } from '../../models/menu-item';
import { BreadCrumbInfo } from '../../models/bread-crumb-info'
import { Product } from '../../admin/model/product';

import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { DanhMucBroadcast } from '../../broadcast/danh-muc-broadcast.service';
import { ProductService } from '../../admin/service/product.service';

@Component({
    selector: 'danh-muc',
    templateUrl: './danh-muc.component.html',
    styleUrls: ['./danh-muc.component.css']
})

export class DanhMucComponent implements OnInit {
    private danhmucId: String;
    private current: DanhMuc;
    private danhmucs: DanhMuc[];
    private products: Product[];

    private limit: number;
    private currentPage: number;
    private fieldOrderBy: string;
    private totalProduct: number;
    
    constructor(
        private route: ActivatedRoute,
        private infoCommonHandle: InformationCommonHandle,
        private danhMucBroadcast: DanhMucBroadcast,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.limit = 12;
        this.currentPage = 0;
        this.fieldOrderBy = "date desc";

        this.route.params.forEach((params: Params) => {
            this.danhmucId = params['id'];

            this.getProducts();

            if (this.danhmucs && this.danhmucs.length > 0) {
                this.current = this.danhmucs.filter(dm => dm.id === this.danhmucId)[0];
                this.updateInformationCommon();
            } else {
                if (localStorage.getItem("danhmucs") != null) {
                    this.danhmucs = JSON.parse(localStorage.getItem("danhmucs"));
                    this.current = this.danhmucs.filter(dm => dm.id === this.danhmucId)[0];
                    this.updateInformationCommon();
                }
            }
        });

        this.danhMucBroadcast.triggerBroadcast().subscribe(dms => {
            this.danhmucs = dms;

            this.current = dms.filter(dm => dm.id === this.danhmucId)[0];
            this.updateInformationCommon();
        });
    }

    onSortChange(fieldOrderBy: string) {
        this.fieldOrderBy = fieldOrderBy;
        this.getProducts();
    }

    onPageChange(nextPage: number) {
        this.currentPage = nextPage;
        this.getProducts();
    }

    private getProducts() {
        this.productService.getProductsActiveByDanhMuc(this.danhmucId, this.limit, this.currentPage, this.fieldOrderBy)
            .subscribe(products => {
                this.products = products;
            });

        this.productService.getTotalProductsActiveByDanhMuc(this.danhmucId)
            .subscribe(amountProduct => this.totalProduct = amountProduct);
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
        let title: string = ""+this.current.seoTitle;
        let keyword: string = ""+this.current.seoKeyword;
        let description: string = ""+this.current.seoDescription;

        let headerInfo = new HeaderInfo("", title, keyword, description);
        return headerInfo;
    }

    private getBreadCrumbInfo(): BreadCrumbInfo[] {
        let dms = this.getDanhMucsRelation(this.current);
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

        return breadcrumbs;
    }

    private getDanhMucsRelation(danhMuc: DanhMuc): DanhMuc[] {
        let result: DanhMuc[] = [danhMuc];

        let dmTemp = danhMuc;
        let isValid = true;
        while (isValid) {
            if (dmTemp.parentId) {
                let filters = this.danhmucs.filter(dm => dm.id === dmTemp.parentId);
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