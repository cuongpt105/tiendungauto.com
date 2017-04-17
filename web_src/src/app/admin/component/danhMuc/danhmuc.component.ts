import {Component, OnInit} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';

import { DanhMuc } from '../../model/danhmuc';
import { DanhMucService} from '../../service/danhmuc.service';

@Component({
    selector: 'danh-muc',
    templateUrl: "./danhmuc.component.html",
    styleUrls: ['./danhmuc.component.css']
})

export class DanhMucComponent implements OnInit{
    private danhmucs: DanhMuc[];
    private danhmuc: DanhMuc;
    private isCreate: Boolean;
    private currentItem: SideBarItem;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sidebarItemService: SideBarItemService,
        private danhmucService: DanhMucService){}

    ngOnInit() {
        this.currentItem = this.sidebarItemService.getItemByName('danhmuc');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.isCreate = false;
        this.danhmucs = [];
        this.danhmucService.getDanhMucs().subscribe(dm => this.danhmucs = dm);
    }

    addRootDanhMuc() {
        this.isCreate = true;
        this.danhmuc = new DanhMuc();
        this.danhmuc.level = 1;
    }

    saveDanhMuc() {
        this.danhmucService.saveDanhMuc(this.danhmuc).subscribe(dm => {
            if (this.isCreate) {
                if (dm.parentId) {
                    this.danhmucs = this.danhmucService.addDanhMucToLevelInList(this.danhmucs, dm);
                } else {
                    this.danhmucs = this.danhmucService.addDanhMucToRootList(this.danhmucs, dm);
                }
            } else {
                // update danh muc in list
                this.danhmucs = this.danhmucService.updateSpecificDanhMucInList(this.danhmucs, dm);
            }
            this.isCreate = false;
            this.danhmuc = null;
        });
    }

    cancelDanhMuc() {
        this.danhmuc = null;
        this.isCreate = false;
    }

    onCreateDanhMuc(parent: DanhMuc) {
        this.isCreate = true;
        this.danhmuc = new DanhMuc();
        this.danhmuc.parentId = parent.id;
        this.danhmuc.level = (parent.level + 1);
    }

    onEditDanhMuc(currentDM: DanhMuc) {
        this.isCreate = false;
        this.danhmuc = JSON.parse(JSON.stringify(currentDM));
    }

    onDeleteDanhMuc(danhmuc: DanhMuc) {
        this.isCreate = false;
        this.danhmucService.deleteDanhMuc(danhmuc.id).subscribe(dms => this.danhmucs = dms);
    }
}
