import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { MenuItem } from '../../models/menu-item';
import { HeaderInfo } from '../../models/header-info'; 
import { BreadCrumbInfo } from '../../models/bread-crumb-info';
import {  BanDo } from '../../admin/model/bando';

import { MenuService } from '../../services/menu.service';
import { HeaderInfoService } from '../../services/header-info.service';
import { InformationCommonHandle } from '../../services/information-common-handle.service';
import { BanDoService } from '../../admin/service/bando.service';

@Component({
    moduleId: module.id,
    selector: 'ban-do',
    templateUrl: './ban-do.html',
    styleUrls: ['./ban-do.css']
})

export class BanDoComponent implements OnInit {
     private itemName: string = 'bando';
     private bandos: BanDo[];
    
    constructor(
        private menuService: MenuService,
        private headerInfoService: HeaderInfoService,
        private informationCommonHandle: InformationCommonHandle,
        private banDoService: BanDoService,
        public sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
        this.bandos = [];
        this.updateInformationCommon();
        this.banDoService.getBanDos().subscribe(bandos => this.bandos = bandos);
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