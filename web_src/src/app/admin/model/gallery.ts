import { FileSystem } from './file-system';
import { Product } from './product';

export class Gallery {
    id: String;
    position: Number;
    title: String;
    image: FileSystem;
    product: Product;

    constructor(title:String, image: FileSystem, product: Product) {
        this.title = title;
        this.image = image;
        this.product = product;
    }
}