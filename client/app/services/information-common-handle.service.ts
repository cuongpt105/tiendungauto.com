import { Injectable } from '@angular/core';

import { MenuItem } from '../models/menu-item';
import { HeaderInfo } from '../models/header-info';
import { BreadCrumbInfo } from '../models/bread-crumb-info';

import { MenuItemBroadcast } from './menu-item-broadcast.service';
import { HeaderInfoBroadcast } from './header-info-broadcast.service';
import { BreadCrumbInfoBroadcast } from './bread-crumb-broadcast.service'; 

@Injectable()
export class InformationCommonHandle {
    private menuItem: MenuItem;
    private headerInfo: HeaderInfo;
    private breadcrumbInfos: BreadCrumbInfo[] = [];

    constructor(
        private menuItemBroadcast: MenuItemBroadcast,
        private headerInfoBroadcast: HeaderInfoBroadcast,
        private breadCrumbInfoBroadcast: BreadCrumbInfoBroadcast
    ){}

    init(): InformationCommonHandle {
        this.menuItem = new MenuItem("","","");
        this.headerInfo = new HeaderInfo("","","","");
        this.breadcrumbInfos = [];
        return this;
    }

    addMenuItem(menuItem: MenuItem): InformationCommonHandle {
        this.menuItem = menuItem;
        return this;
    }

    addHeaderInfo(headerInfo: HeaderInfo): InformationCommonHandle {
        this.headerInfo = headerInfo;
        return this;
    }

    addBreadCrumbs(breadCrumbs: BreadCrumbInfo[]): InformationCommonHandle {
        this.breadcrumbInfos = breadCrumbs;
        return this;
    }

    fireUpdateData() {
        this.menuItemBroadcast.broadCastValue(this.menuItem);
        this.headerInfoBroadcast.broadCastValue(this.headerInfo);
        this.breadCrumbInfoBroadcast.broadCastValue(this.breadcrumbInfos);
    }
}