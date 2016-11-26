import { Component, OnInit, Input, Output, EventEmitter, NgZone} from '@angular/core';

import { FileSystem } from '../../model/file-system';
import {Product} from '../../model/product';
import { ProductImage} from '../../model/productimage'

import { CommonBroadcast } from '../../service/common-broadcast.service';
import { ProductService } from '../../service/product.service';
import { ProductImageService} from '../../service/productimage.service';

@Component({
    selector: 'product-modify',
    templateUrl: "./productmodify.component.html",
    styleUrls: ['./productmodify.component.css']
})

export class ProductModifyComponent implements OnInit {
	private productImages: ProductImage[];
	private filesToUpload: Array<File>;
	private numberOfDataUpload: number;
	
	@Input()
	private product: Product;
	
	@Output()
	private onCancelProduct: EventEmitter<Product> = new EventEmitter<Product>();
	
	@Output()
	private onSaveProduct: EventEmitter<Product> = new EventEmitter<Product>();

	constructor(
		private broadcast: CommonBroadcast<ProductImage[]>,
		private productService: ProductService,
		private productImageService: ProductImageService,
		private _ngZone: NgZone){}
		
	ngOnInit() {
		this.productImages = [];
		this.filesToUpload = [];
		
		this.numberOfDataUpload = 0;
		this.productImageService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });
		
		if (this.product.id) {
			this.productImageService.getProductImages(this.product.id)
			.subscribe(files => {
				this.productImages = files;
				this.broadcast.broadCastValue(this.productImages);
			});
		}
	}
	
	fileChangeEvent(fileInput: any) {
        this.filesToUpload = [];
        this.filesToUpload = <Array<File>> fileInput.target.files;
        
		if (this.product.id) {
			this.productImageService.uploadLoadFile(this.product.id, this.filesToUpload)
					.subscribe(productImages => this.productImages = productImages);
		} else {
			let product = new Product();
			product.danhmuc = this.product.danhmuc;
			this.productService.saveProductAsDraft(product).subscribe(product => {
				this.product.id = product.id;
				this.productImageService.uploadLoadFile(product.id, this.filesToUpload)
					.subscribe(productImages => this.productImages = productImages);
			});
		}
    }

	imageDetailChange(filesSelect: FileSystem[]) {
		this.product.imagesDetail = [];
		this.product.imagesDetail = filesSelect;
	}
	
	deleteFile(productImage: ProductImage) {
		this.productImageService.deleteFile(productImage.id)
			.subscribe(productImages => this.productImages = productImages);
	}

	selectMainImage(file: FileSystem) {
		this.product.mainImage = file;
	}
	
	saveProduct() {
		this.onSaveProduct.emit(this.product);
	}
	
	cancelProduct() {8
		this.onCancelProduct.emit(this.product);
	}
}