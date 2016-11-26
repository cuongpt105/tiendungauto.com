import { Component, OnInit } from '@angular/core';

import { DanhMuc } from '../../admin/model/danhmuc';

import { DanhMucService } from '../../admin/service/danhmuc.service';
import { DanhMucBroadcast } from '../../broadcast/danh-muc-broadcast.service';

@Component({
    selector: 'side-bar',
    templateUrl: './side-bar.component.html',
    styleUrls: ['./side-bar.component.css']
})

export class SideBarComponent implements OnInit {
    private danhMucSelected: DanhMuc;
    private danhmucs: DanhMuc[];
    private danhMucList: DanhMuc[];

    constructor(
        private danhMucService: DanhMucService,
        private danhMucBroadcast: DanhMucBroadcast
    ){}

    ngOnInit() {
        this.danhMucList = [];
        this.danhMucService.getDanhMucs().subscribe(dms => {
            this.danhmucs = dms;
            this.danhMucList = this.convertTreeToList();

            localStorage.setItem("danhmucs", JSON.stringify(this.danhMucList));
            this.danhMucBroadcast.broadCastValue(this.danhMucList);
        });
    }

    onCategorySelected(danhmuc: DanhMuc) {
        this.danhMucSelected = danhmuc;
    }

    private convertTreeToList(): DanhMuc[] {
        let danhmucList : DanhMuc[] = [];
        for (let dm of this.danhmucs) {
           this.addChildrenToList(danhmucList, dm);
        }

        return danhmucList;
    }

    private addChildrenToList(danhMucList: DanhMuc[], currentDanhMuc: DanhMuc) {
        danhMucList.push(currentDanhMuc);

        if (currentDanhMuc.children && currentDanhMuc.children.length > 0) {
            for (let dm of currentDanhMuc.children) {
                this.addChildrenToList(danhMucList, dm);
            }
        }
    }
}