import { Product } from '../admin/model/product';
import { Gallery } from '../admin/model/gallery';

export class GalleryUtil {
    static convertToGalleryFromProduct(product: Product) : Gallery[] {
        let galleries: Gallery[] = [];

        for (let image of product.imagesDetail) {
            let gallery = new Gallery("", image, product);
            galleries.push(gallery);
        }

        return galleries;
    }
}