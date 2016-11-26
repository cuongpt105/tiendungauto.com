import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../models/menu-item';
import { HeaderInfo } from '../../models/header-info'; 
import { BreadCrumbInfo } from '../../models/bread-crumb-info';
import { DichVu } from '../../admin/model/dichvu';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { DichVuService } from '../../admin/service/dichvu.service';

@Component({
    selector: 'dich-vu',
    templateUrl: './dich-vu.html',
    styleUrls: ['./dich-vu.css']
})

export class DichVuComponent implements OnInit {
     private itemName: string = 'dichvu';
     private dichVu: DichVu;
    
    constructor(
        private menuService: MenuService,
        private headerInfoService: HeaderInfoService,
        private informationCommonHandle: InformationCommonHandle,
        private dichVuService: DichVuService
    ) {}

    ngOnInit() {
        this.dichVu = new DichVu();
        this.updateInformationCommon();
        this.dichVuService.getDichVu().subscribe(dichVu => this.dichVu = dichVu);
    }

    private updateInformationCommon() {
        this.informationCommonHandle
            .init()
            .addMenuItem(this.menuService.getMenuItemByName(this.itemName))
            .addHeaderInfo(this.headerInfoService.getHeaderInfoByName(this.itemName))
            .addBreadCrumbs(this.getBreadCrumbs())
            .fireUpdateData();
    }

    private getBreadCrumbs(): BreadCrumbInfo[] {
        let bcs: BreadCrumbInfo[] = [];

        let menuItem = this.menuService.getMenuItemByName(this.itemName);
        bcs.push(new BreadCrumbInfo(menuItem.linkRef, menuItem.value));

        return bcs;
    }
}