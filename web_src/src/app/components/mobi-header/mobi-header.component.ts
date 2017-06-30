import { Component, OnInit, Input } from '@angular/core';

import { FileSystem } from '../../admin/model/file-system';
import { MenuItem } from '../../models/menu-item';

import { DanhMuc } from '../../admin/model/danhmuc';

import { DanhMucService } from '../../admin/service/danhmuc.service';

@Component({
  selector: 'mobi-header',
  templateUrl: './mobi-header.component.html',
  styleUrls: ['./mobi-header.component.css']
})

export class MobiHeaderComponent implements OnInit {
    private isShowCategoryItem: Boolean;
    private isShowMenuItem: Boolean;
    private isShowSearchInput: Boolean;
    private inputSearch: String;
    private danhmucs: DanhMuc[];

    @Input()
    private menuItems: MenuItem[];

    @Input()
    private headerFile: FileSystem;

    @Input()
    private totalQuantity: number;

    constructor(private danhMucService: DanhMucService){}

    ngOnInit() {
        this.isShowCategoryItem = false;
        this.isShowMenuItem = false;
        this.isShowSearchInput = false;
        this.inputSearch = "";

        this.menuItems;
        this.danhmucs;
        this.headerFile;
        this.totalQuantity;

        this.danhMucService.getDanhMucs().subscribe(dms => {
            this.danhmucs = dms;
        });
    }

    onSearchSelected() {
        this.isShowSearchInput = true;
        this.isShowCategoryItem = false;
        this.isShowMenuItem = false;
    }

    onMenuItemSelected() {
        this.isShowMenuItem = !this.isShowMenuItem;
        this.isShowCategoryItem = false;
        this.isShowSearchInput = false;
    }

    onCategorySelected() {
        this.isShowCategoryItem = !this.isShowCategoryItem;
        this.isShowMenuItem = false;
        this.isShowSearchInput = false;
    }

    onRemoveMenu() {
        this.isShowCategoryItem = false;
        this.isShowMenuItem = false;
        this.isShowSearchInput = false;
    }

    onCartIconSelected() {
        // redirect to cart page
    }

    enterInputSearch() {
        // redirect to search page with key search
        this.isShowSearchInput = false;
    }
}