import {Component, OnInit, NgZone} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { FileSystem} from '../../model/file-system';
import { Gallery } from '../../model/gallery';
import { DanhMuc } from '../../model/danhmuc';
import { Product } from '../../model/product';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';
import { GalleryService } from '../../service/gallery.service';
import { DanhMucService } from '../../service/danhmuc.service';
import { ProductService } from '../../service/product.service';

@Component({
    selector: 'galary',
    templateUrl: "./galary.html",
    styleUrls: ['./galary.css']
})

export class GalaryComponent implements OnInit{
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;

    private gallery : Gallery;
    private galleries : Gallery[];
    private danhMucs: DanhMuc[];
    private products: Product[];
    private productSelected: Product;
    private numberOfDataUpload: number;

    private isView: boolean;
    private isModify: boolean;
    private isShowProduct: boolean;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sideBarItemService: SideBarItemService,
        private galleryService: GalleryService,
        private danhMucService: DanhMucService,
        private productService: ProductService,
        private _ngZone: NgZone
    ){}

    ngOnInit() {
        this.currentItem = this.sideBarItemService.getItemByName("gallery");
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.filesToUpload = [];
        this.galleries = [];
        this.danhMucs = [];
        this.products = [];

        this.isView = false;
        this.isModify = false;
        this.isShowProduct = false;
        this.gallery = new Gallery();
        this.productSelected = new Product();

        this.numberOfDataUpload = 0;
        //this.tintucfileService.percentUploaded.subscribe(percent => {
        //    this._ngZone.run(() => this.numberOfDataUpload = percent);
        //});

        this.galleryService.getGalleries().subscribe(galleries => {
            this.galleries = galleries.sort(this.sortGallery);
        });
    }

    createGallery() {
        this.isModify = true;
        this.isView = false;
        this.gallery = new Gallery();
    }

    viewGallery(gallery: Gallery) {
        this.isModify = false;
        this.isView = true;
        this.gallery = gallery;
    }

    editGallery(gallery: Gallery) {
        this.isView = false;
        this.isModify = true;
        this.gallery = gallery;
    }

    cancelGallery() {
        this.isView = false;
        this.isModify = false;
        this.gallery = null;
    }

    saveGallery() {
        this.galleryService.saveGallery(this.gallery).subscribe(gallery => {
            this.galleries = this.galleries.filter(gal => gal.id !== gallery.id);
            this.galleries.push(gallery);
            this.galleries = this.galleries.sort(this.sortGallery);
        });
    }

    deleteGallery(galleryDelete: Gallery) {
        this.galleryService.deleteGallery(galleryDelete.id).subscribe(result =>{
            if (result) {
                this.galleries = this.galleries.filter(gal => gal.id !== galleryDelete.id);
            }
        });
    }

    updateProduct() {
        this.isShowProduct = true;
        this.products = [];

        if (!(this.danhMucs && this.danhMucs.length > 0)) {
            this.danhMucs = [];
             this.danhMucService.getDanhMucs().subscribe(dms => {
                 this.danhMucs = dms;
            });
        }
    }

    selectionDanhMuc(danhMuc: DanhMuc) {
        this.products = [];
        this.productService.getProducts(danhMuc.id).subscribe(products => this.products = products);
    }

    selectionProduct(product: Product) {
        this.productSelected = product;
    }

    cancelChooseProduct() {
        this.products = [];
        this.isShowProduct = false;
    }

    finishSelectProduct() {
        this.gallery.product = this.productSelected;
        this.products = [];
        this.isShowProduct = false;
    }

    private sortGallery(a:Gallery, b:Gallery) {
        if (a.position < b.position) {
            return -1;
        } 

        if (a.position > b.position) {
            return 1;
        }

        return 0;
    }
}
