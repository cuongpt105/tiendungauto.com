import { FileSystem } from './file-system';
import { Product } from './product';

export class Gallery {
    id: String;
    position: Number;
    title: String;
    image: FileSystem;
    product: Product;
}