import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { DanhMuc } from '../../model/danhmuc';

@Component({
    selector: 'danh-muc-item',
    templateUrl: "./danhmucitem.component.html",
    styleUrls: ['./danhmucitem.component.css']
})

export class DanhMucItemComponent implements OnInit{
    @Input()
    private danhmucs: DanhMuc[];

    @Output()
    private onCreateDanhMuc: EventEmitter<DanhMuc> = new EventEmitter<DanhMuc>();

    @Output()
    private onEditDanhMuc: EventEmitter<DanhMuc> = new EventEmitter<DanhMuc>();

    @Output()
    private onDeleteDanhMuc: EventEmitter<DanhMuc> = new EventEmitter<DanhMuc>();

    constructor(){}

    ngOnInit() {
        this.danhmucs;
    }

    createDanhMuc(parent: DanhMuc) {
        this.onCreateDanhMuc.emit(parent);
    }

    editDanhMuc(currentDM: DanhMuc) {
        this.onEditDanhMuc.emit(currentDM);
    }

    deleteDanhMuc(danhmuc: DanhMuc) {
        this.onDeleteDanhMuc.emit(danhmuc);
    }
}
