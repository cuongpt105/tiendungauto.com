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

import { FileSystemService} from '../../../services/file-system.service';

import { DanhMucUtil } from '../../../util/danh-muc-util';

@Component({
    selector: 'gallery',
    templateUrl: "./gallery.html",
    styleUrls: ['./gallery.css','../progress-bar.css']
})

export class GalleryComponent implements OnInit{
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;

    private gallery : Gallery;
    private galleries : Gallery[];
    private danhMucs: DanhMuc[];
    private products: Product[];
    private productSelected: Product;
    private danhMucSelected: DanhMuc;
    private fileSystemUpload: FileSystem;

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
        private fileSystemService: FileSystemService,
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
        this.gallery = new Gallery("", null, null);
        this.productSelected = new Product();
        this.danhMucSelected = new DanhMuc();

        this.numberOfDataUpload = 0;
        this.fileSystemService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });

        this.galleryService.getGalleries().subscribe(galleries => {
            this.galleries = galleries.sort(this.sortGallery);
        });

        this.danhMucService.getDanhMucs().subscribe(dms => {
            this.danhMucs = DanhMucUtil.convertTreeDMToListDM(dms);
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = [];
        this.filesToUpload = <Array<File>> fileInput.target.files;
		
        if (this.fileSystemUpload) {
            this.deleteFileAndUpload();
        } else {
            this.uploadFile();
        }
    }

    private uploadFile() {
        this.fileSystemService.uploadLoadFile(this.filesToUpload).subscribe(fileSystems => {
            if (fileSystems && fileSystems.length > 0) {
                this.fileSystemUpload = fileSystems[0];
                this.gallery.image = this.fileSystemUpload;
            }
        });
    }

    private deleteFileUpload() {
        this.fileSystemService.deleteFile(this.fileSystemUpload.id).subscribe(result => {
            result;
            this.fileSystemUpload = null;
        });
    }

    private deleteFileAndUpload() {
        this.fileSystemService.deleteFile(this.fileSystemUpload.id).subscribe(result => {
            if (result) {
                this.uploadFile();
            }
        });
    }

    createGallery() {
        this.isModify = true;
        this.isView = false;
        this.gallery = new Gallery("", null, null);
        this.fileSystemUpload = null;
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
        this.fileSystemUpload = null;
    }

    cancelGallery() {
        this.isView = false;
        this.isModify = false;
        this.gallery = null;
        if (this.fileSystemUpload) {
            this.deleteFileUpload();
        }
    }

    saveGallery() {
        this.galleryService.saveGallery(this.gallery).subscribe(gallery => {
            this.gallery = gallery;
            this.isModify = false;
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
        this.danhMucSelected = new DanhMuc();
        this.productSelected = new Product();
    }

    selectionDanhMuc(danhMuc: DanhMuc) {
        this.products = [];
        this.danhMucSelected = danhMuc;
        this.productService.getProducts(danhMuc.id).subscribe(products => this.products = products);
    }

    selectionProduct(product: Product) {
        this.productSelected = product;
    }

    cancelProduct() {
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
