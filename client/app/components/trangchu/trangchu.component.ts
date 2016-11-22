import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../models/menu-item';
import { HeaderInfo } from '../../models/header-info'; 
import { BreadCrumbInfo } from '../../models/bread-crumb-info';
import { Product } from '../../admin/model/product';
import { Gallery } from '../../models/gallery';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { ProductService } from '../../admin/service/product.service'; 
import { GalleryUtil } from '../../util/gallery-util'

@Component({
    moduleId: module.id,
    selector: 'trang-chu',
    templateUrl: './trangchu.component.html',
    styleUrls: ['./trangchu.component.css']
})

export class TrangChuComponent implements OnInit {
    private itemName: string = 'trangchu';
    private products: Product[];
    private galleries: Gallery[];
    
    constructor(
        private menuService: MenuService,
        private headerInfoService: HeaderInfoService,
        private informationCommonHandle: InformationCommonHandle,
        private productService: ProductService
    ) {}

    ngOnInit() {
        this.products = [];
        this.galleries = [];
        this.updateInformationCommon();
        this.productService.getLatestProductsActiveBySpecifyField(12, "date desc")
            .subscribe(products => {
                this.products = products;
            });

        // service to get gallery and convert this one to gallery on client
        this.galleries = GalleryUtil.convertToGalleryFromImageGallery();
    }

    private updateInformationCommon() {
        this.informationCommonHandle
            .init()
            .addMenuItem(this.menuService.getMenuItemByName(this.itemName))
            .addHeaderInfo(this.headerInfoService.getHeaderInfoByName(this.itemName))
            .addBreadCrumbs([])
            .fireUpdateData();
    }
}