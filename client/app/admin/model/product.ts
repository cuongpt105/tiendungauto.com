import { DanhMuc } from './danhmuc'; 
import { FileSystem } from './file-system';

export class Product {
    id: String;
    name: String;
    code: String;
    shortDescription: String;
    detailDescription: String;
    priceOriginal: number;
    priceSell: number;
    pricePromotion: number;
    position: number;
    status: String;
    producer: String;
    quantity: number;
    guarantee: String;
    vat: number;
    unit: String;
    seoTitle: String;
    seoKeyword: String;
    seoDescription: String;
    isDraft: boolean;
    danhmuc: DanhMuc;
    mainImage: FileSystem;
    imagesDetail: FileSystem[];
    rating: number;
}