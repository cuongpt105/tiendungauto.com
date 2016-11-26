import { Component, OnInit } from '@angular/core';

import { MenuItem } from '../../models/menu-item';
import { HeaderInfo } from '../../models/header-info'; 
import { BreadCrumbInfo } from '../../models/bread-crumb-info';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';

@Component({
    selector: 'tin-tuc',
    templateUrl: './tin-tuc.html',
    styleUrls: ['./tin-tuc.css']
})

export class TinTucComponent implements OnInit {
     private itemName: string = 'tintuc';
    
    constructor(
        private menuService: MenuService,
        private headerInfoService: HeaderInfoService,
        private informationCommonHandle: InformationCommonHandle
    ) {}

    ngOnInit() {
        this.updateInformationCommon();
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