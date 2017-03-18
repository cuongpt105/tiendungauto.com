import { Component, OnInit } from '@angular/core';

import { BreadCrumbInfo } from '../../models/bread-crumb-info';
import { GioiThieu } from '../../admin/model/gioithieu';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { GioiThieuService } from '../../admin/service/gioithieu.service';

@Component({
    selector: 'gioi-thieu',
    templateUrl: './gioithieu.component.html',
    styleUrls: ['./gioithieu.component.css']
})

export class GioiThieuComponent implements OnInit {
     private itemName: string = 'gioithieu';
     private gioiThieu: GioiThieu;
    
    constructor(
        private menuService: MenuService,
        private headerInfoService: HeaderInfoService,
        private informationCommonHandle: InformationCommonHandle,
        private gioiThieuService: GioiThieuService
    ) {}

    ngOnInit() {
        this.gioiThieu = new GioiThieu();

        this.updateInformationCommon();
        this.gioiThieuService.getGioiThieu().subscribe(gioithieu => this.gioiThieu = gioithieu);
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