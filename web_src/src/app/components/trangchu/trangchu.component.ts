import { Component, OnInit } from '@angular/core';

import { Product } from '../../admin/model/product';
import { Gallery } from '../../admin/model/gallery';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { ProductService } from '../../admin/service/product.service';
import { GalleryService } from '../../admin/service/gallery.service'; 

@Component({
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
        private productService: ProductService,
        private galleryService: GalleryService
    ) {}

    ngOnInit() {
        this.products = [];
        this.galleries = [];
        this.updateInformationCommon();
        this.productService.getLatestProductsActiveBySpecifyField(12, 'date desc')
            .subscribe(products => {
                this.products = products;
                for (let product of products) {
                    product.rating = 4;
                }
            });

        this.galleryService.getGalleries().subscribe(galleries => this.galleries = galleries);
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