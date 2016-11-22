"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var Rx_1 = require('rxjs/Rx');
var app_setting_1 = require('../../util/app-setting');
var ProductService = (function () {
    function ProductService(http) {
        this.http = http;
        this.danhmucUrl = app_setting_1.AppSettings.API_ENDPOINT + '/danhmuc';
        this.productUrl = app_setting_1.AppSettings.API_ENDPOINT + '/product';
        this.productsUrl = app_setting_1.AppSettings.API_ENDPOINT + '/products';
    }
    ProductService.prototype.getProducts = function (danhmucId) {
        var url = this.danhmucUrl + "/" + danhmucId + "/product";
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getProductById = function (productId) {
        var url = this.productUrl + "/" + productId;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getLatestProductsActiveBySpecifyField = function (limit, fieldOrderBy) {
        var url = this.productsUrl + "?limit=" + limit + "&fieldOrderBy=" + fieldOrderBy;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getProductsActiveByDanhMuc = function (danhmucId, limit, nextPage, fieldOrderBy) {
        var url = this.productsUrl + "?danhMucId=" + danhmucId + "&limit=" + limit + "&nextPage=" + nextPage + "&fieldOrderBy=" + fieldOrderBy;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getTotalProductsActiveByDanhMuc = function (danhMucId) {
        var url = this.productsUrl + "/total-product?danhMucId=" + danhMucId;
        return this.http.get(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.saveProductAsDraft = function (product) {
        var url = this.danhmucUrl + "/" + product.danhmuc.id + "/product";
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        product.isDraft = true;
        return this.http
            .post(url, JSON.stringify(product), { headers: headers })
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.saveProduct = function (product) {
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        product.isDraft = false;
        if (product.id) {
            var url = this.productUrl + "/" + product.id;
            return this.http
                .put(url, JSON.stringify(product), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
        else {
            var url = this.danhmucUrl + "/" + product.danhmuc.id + "/product";
            return this.http
                .post(url, JSON.stringify(product), { headers: headers })
                .map(function (res) { return res.json(); })
                .catch(this.handleError);
        }
    };
    ProductService.prototype.deleteProduct = function (productId) {
        var url = this.productUrl + "/" + productId;
        return this.http.delete(url)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    ProductService.prototype.addProductInList = function (products, product) {
        products.push(product);
        return products.sort(this.compareProduct);
    };
    ProductService.prototype.updateProductInList = function (products, product) {
        var deleteCount = 1;
        var indexStart = products.findIndex(function (dm) { return dm.id === product.id; });
        if (indexStart >= 0) {
            products = products.splice(indexStart, deleteCount, product);
        }
        return products.sort(this.compareProduct);
    };
    ProductService.prototype.compareProduct = function (a, b) {
        if (a.position < b.position) {
            return -1;
        }
        if (a.position > b.position) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    };
    ProductService.prototype.handleError = function (error) {
        console.log('An error occurred at product service:', error);
        return Rx_1.Observable.throw(error.message || error);
    };
    ProductService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map