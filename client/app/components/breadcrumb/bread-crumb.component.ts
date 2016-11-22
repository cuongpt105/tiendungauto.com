import { Component, OnInit } from '@angular/core';

import { BreadCrumbInfo } from '../../models/bread-crumb-info';
import { MenuItem } from '../../models/menu-item';

import { BreadCrumbInfoBroadcast } from '../../services/bread-crumb-broadcast.service';
import { MenuService } from '../../services/menu.service';

@Component({
    moduleId: module.id,
    selector: 'bread-crumb',
    templateUrl: './bread-crumb.component.html',
    styleUrls: ['./bread-crumb.component.css']
})

export class BreadCrumbComponent implements OnInit {
    private breadCrumbInfos: BreadCrumbInfo[];
    private breadCrumbActive: BreadCrumbInfo;

    constructor(
        private breadcrumbBroadcast: BreadCrumbInfoBroadcast,
        private menuService: MenuService
    ){}

    ngOnInit() {
        this.breadCrumbActive = new BreadCrumbInfo("", "");
        this.breadCrumbInfos = [];
        this.breadcrumbBroadcast.triggerBroadcast().subscribe(bcs => {
            this.breadCrumbActive = new BreadCrumbInfo("", "");
            this.breadCrumbInfos = [];
            if (bcs && bcs.length > 0) {
                this.breadCrumbInfos = [];
                let menu: MenuItem = this.menuService.getMenuItemByName("trangchu");
                let breadCrumb = new BreadCrumbInfo(menu.linkRef, menu.value);
                this.breadCrumbInfos.push(breadCrumb);
                
                for (let bc of bcs) {
                    this.breadCrumbInfos.push(bc);
                }

                this.breadCrumbActive = this.breadCrumbInfos.pop();
            }
        });
    }
}