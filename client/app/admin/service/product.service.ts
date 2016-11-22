import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Rx';
import { AppSettings } from '../../util/app-setting';

import {Product} from '../model/product';

@Injectable() 
export class ProductService {
    public danhmucUrl: String = AppSettings.API_ENDPOINT + '/danhmuc'
    public productUrl: string = AppSettings.API_ENDPOINT + '/product';
    public productsUrl: string = AppSettings.API_ENDPOINT + '/products';
    
    constructor(private http : Http){}

    getProducts(danhmucId: String) : Observable<Product[]> {
        let url = `${this.danhmucUrl}/${danhmucId}/product`;
        return this.http.get(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getProductById(productId: string) : Observable<Product> {
        let url = `${this.productUrl}/${productId}`;
        return this.http.get(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    getLatestProductsActiveBySpecifyField(limit: number, fieldOrderBy: String): Observable<Product[]> {
        let url = `${this.productsUrl}?limit=${limit}&fieldOrderBy=${fieldOrderBy}`;
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    getProductsActiveByDanhMuc(danhmucId: String, limit: number, nextPage: number, fieldOrderBy: string): Observable<Product[]> {
        let url = `${this.productsUrl}?danhMucId=${danhmucId}&limit=${limit}&nextPage=${nextPage}&fieldOrderBy=${fieldOrderBy}`;
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    }
    
    getTotalProductsActiveByDanhMuc(danhMucId: String): Observable<number> {
        let url = `${this.productsUrl}/total-product?danhMucId=${danhMucId}`;
        return this.http.get(url)
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    saveProductAsDraft(product: Product): Observable<Product> {
        let url = `${this.danhmucUrl}/${product.danhmuc.id}/product`;
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        product.isDraft = true;
        return this.http
                    .post(url, JSON.stringify(product), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
    }

    saveProduct(product: Product) : Observable<Product> {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        product.isDraft = false;

        if (product.id) {
            let url = `${this.productUrl}/${product.id}`;
             return this.http
                    .put(url, JSON.stringify(product), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        } else {
            let url = `${this.danhmucUrl}/${product.danhmuc.id}/product`;
             return this.http
                    .post(url, JSON.stringify(product), {headers: headers})
                    .map(res => res.json())
                    .catch(this.handleError);
        }
       
    }

    deleteProduct(productId: String): Observable<Product[]> {
        let url = `${this.productUrl}/${productId}`;
        return this.http.delete(url)
                        .map(res => res.json())
                        .catch(this.handleError);
    }

    addProductInList(products: Product[], product: Product): Product[] {
        products.push(product);

        return products.sort(this.compareProduct);
    }

    updateProductInList(products: Product[], product: Product): Product[] {
        let deleteCount: number = 1;
        let indexStart = products.findIndex(dm => dm.id === product.id);

        if (indexStart >= 0) {
            products =  products.splice(indexStart, deleteCount, product);
        }

        return products.sort(this.compareProduct);
    }

    private compareProduct(a:Product, b:Product) {
        if (a.position < b.position) {
            return -1;
        }

        if (a.position > b.position) {
            return 1;
        }

        if (a.name < b.name) {
            return - 1;
        }

        if (a.name > b.name) {
            return 1;
        }

        return 0;
    }

    private handleError (error: any) {
        console.log('An error occurred at product service:', error);
        return Observable.throw(error.message || error);
    }
}
