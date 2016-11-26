import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import { DanhMuc } from '../../model/danhmuc';

@Component({
    selector: 'danh-muc-selection',
    templateUrl: "./danhmucselection.component.html",
    styleUrls: ['./danhmucselection.component.css']
})

export class DanhMucSelectionComponent implements OnInit{
    @Input()
    private danhmucs: DanhMuc[];

    @Output()
    private onSelection: EventEmitter<DanhMuc> = new EventEmitter<DanhMuc>();

    constructor(){}

    ngOnInit() {}

    selectDanhMuc(danhmuc: DanhMuc) {
        this.onSelection.emit(danhmuc);
    }
}
