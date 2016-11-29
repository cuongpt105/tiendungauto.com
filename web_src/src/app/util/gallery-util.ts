import { Product } from '../admin/model/product';
import { Gallery } from '../models/gallery';

export class GalleryUtil {
    static convertToGalleryFromImageGallery(): Gallery[] {
        let galleries: Gallery[] = [];

        let index = 1;
        while(index < 10) {
            if (index === 1) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/product.jpg", "580e2b713a0f54145c068858");
                galleries.push(gallery);
            }

            if (index === 2) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Chrysanthemum.jpg", "580e2b713a0f54145c068858");
                galleries.push(gallery);
            }

            if (index === 3) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Desert.jpg", "");
                galleries.push(gallery);
            }

            if (index === 4) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Hydrangeas.jpg", "");
                galleries.push(gallery);
            }

            if (index === 5) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Jellyfish.jpg", "");
                galleries.push(gallery);
            }

            if (index === 6) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Koala.jpg", "");
                galleries.push(gallery);
            }

            if (index === 7) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Lighthouse.jpg", "");
                galleries.push(gallery);
            }

            if (index === 8) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Penguins.jpg", "");
                galleries.push(gallery);
            }

            if (index === 9) {
                let gallery = new Gallery("title"+index,"name"+index, "icon/Tulips.jpg","");
                galleries.push(gallery);
            }
            
            index++;
        }

        return galleries;
    }

    static convertToGalleryFromProduct(product: Product) : Gallery[] {
        let galleries: Gallery[] = [];

        for (let image of product.imagesDetail) {
            let gallery = new Gallery(image.originalName, image.originalName, image.pathFile, ""+product.id);
            galleries.push(gallery);
        }

        return galleries;
    }
}