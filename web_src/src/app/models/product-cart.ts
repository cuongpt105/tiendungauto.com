import {Product} from '../admin/model/product';

export class ProductCart {
    quantity: number;
    product: Product;
    
    public constructor(quantity : number, product : Product) {
        this.quantity = quantity;
        this.product = product;
    }
}