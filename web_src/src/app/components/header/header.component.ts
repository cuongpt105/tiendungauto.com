import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../models/menu-item';
import { Header } from '../../admin/model/header';
import { FileSystem } from '../../admin/model/file-system';

import { HeaderService } from '../../admin/service/header.service'
import { MenuService } from '../../services/menu.service';
import { MenuItemBroadcast } from '../../services/menu-item-broadcast.service';
import { CommonBroadcast } from '../../services/common-broadcast.service';

@Component({
  selector: 'header-customize',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
    private isResponsive: Boolean;

    private header: Header;
    private menuItems: MenuItem[];
    private menuItemSelected: MenuItem;

    constructor(
        private menuService: MenuService,
        private headerService: HeaderService,
        private commonBroadcast: MenuItemBroadcast){}

    ngOnInit() {
        let file = new FileSystem();
        this.header = new Header();
        this.header.file = file;
        this.isResponsive = false;
        this.menuItemSelected = new MenuItem("","","");

        this.headerService.getHeader().subscribe(header => this.header = header);
        this.menuItems = this.menuService.getSidebarItems();
        this.commonBroadcast.triggerBroadcast().subscribe(menuItem => {
            this.menuItemSelected = menuItem;
        });
    }

    onMenuItemSelected(menuItem: MenuItem) {
        this.menuItemSelected = menuItem;
        this.isResponsive = !this.isResponsive;
    }

    expandCollapseMenu() {
        this.isResponsive = !this.isResponsive;
    }
}