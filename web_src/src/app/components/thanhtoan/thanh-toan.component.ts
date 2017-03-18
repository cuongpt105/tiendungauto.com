import { Component, OnInit } from '@angular/core';

import { BreadCrumbInfo } from '../../models/bread-crumb-info';
import { ThanhToan } from '../../admin/model/thanhtoan';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { ThanhToanService } from '../../admin/service/thanhtoan.service';

@Component({
    selector: 'thanh-toan',
    templateUrl: './thanh-toan.html',
    styleUrls: ['./thanh-toan.css']
})

export class ThanhToanComponent implements OnInit {
     private itemName: string = 'thanhtoan';
     private thanhToan: ThanhToan;
    
    constructor(
        private menuService: MenuService,
        private headerInfoService: HeaderInfoService,
        private informationCommonHandle: InformationCommonHandle,
        private thanhToanService: ThanhToanService
    ) {}

    ngOnInit() {
        this.thanhToan = new ThanhToan();
        this.updateInformationCommon();
        this.thanhToanService.getThanhToan().subscribe(thanhToan => this.thanhToan = thanhToan);
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