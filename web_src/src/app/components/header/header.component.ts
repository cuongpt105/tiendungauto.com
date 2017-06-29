import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../models/menu-item';
import { Header } from '../../admin/model/header';
import { FileSystem } from '../../admin/model/file-system';
import { ProductCart } from '../../models/product-cart';

import { HeaderService } from '../../admin/service/header.service'
import { MenuService } from '../../services/menu.service';
import { MenuItemBroadcast } from '../../services/menu-item-broadcast.service';
import { ProductCartBroadcast } from '../../broadcast/product-cart-broadcast.service';

@Component({
  selector: 'header-customize',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    private header: Header;
    private menuItems: MenuItem[];
    private menuItemSelected: MenuItem;
    private productCarts: ProductCart[];
    private totalAmount: number;
    private totalQuantity: number;

    constructor(
        private menuService: MenuService,
        private headerService: HeaderService,
        private commonBroadcast: MenuItemBroadcast,
        private productCartBroadcast: ProductCartBroadcast){}

    ngOnInit() {
        let file = new FileSystem();
        this.header = new Header();
        this.header.file = file;
        this.menuItemSelected = new MenuItem("","","");
        this.totalQuantity = 0;
        this.totalAmount = 0;
        this.productCarts = [];

        this.headerService.getHeader().subscribe(header => this.header = header);
        this.menuItems = this.menuService.getSidebarItems();
        this.commonBroadcast.triggerBroadcast().subscribe(menuItem => {
            this.menuItemSelected = menuItem;
        });

        if (localStorage.getItem("productCarts") != null) {
            this.productCarts = JSON.parse(localStorage.getItem("productCarts"));
            this.calculateTotalAmount();
        }

        this.productCartBroadcast.triggerBroadcast().subscribe(productCart => {
            let productExisting = false;
            for (let pdc of this.productCarts) {
                    if (pdc.product.id.length > 0 && pdc.product.id === productCart.product.id) {
                        pdc.quantity = pdc.quantity + productCart.quantity;
                        productExisting = true;
                    }
                }
            

            if (!productExisting) {
                this.productCarts.push(productCart);
            }

            this.calculateTotalAmount();
            localStorage.setItem("productCarts", JSON.stringify(this.productCarts));
        });
    }

    private calculateTotalAmount() {
        this.totalAmount = 0;
        this.totalQuantity = 0;
        for (let pdc of this.productCarts) {
            this.totalQuantity = this.totalQuantity + pdc.quantity;
            this.totalAmount = this.totalAmount + (pdc.quantity * pdc.product.priceSell);
        }
    }
}