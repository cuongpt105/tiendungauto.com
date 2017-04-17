import { Injectable } from '@angular/core';

import { ProductCart } from '../models/product-cart';

import { CommonBroadcast} from '../services/common-broadcast.service';

@Injectable()
export class ProductCartBroadcast extends CommonBroadcast<ProductCart> {
}