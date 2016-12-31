import {Component, OnInit, NgZone} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { FileSystem} from '../../model/file-system';
import { GioiThieu } from '../../model/gioithieu';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';

import { GioiThieuService } from '../../service/gioithieu.service';

@Component({
    selector: 'gioi-thieu',
    templateUrl: "./gioithieu.component.html",
    styleUrls: ['./gioithieu.component.css','../progress-bar.css']
})

export class GioiThieuComponent implements OnInit {
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;
    private gioithieu : GioiThieu;
    private files : FileSystem[];
    private numberOfDataUpload: number;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sidebarItemService: SideBarItemService,
        private gioithieuService: GioiThieuService,
        private _ngZone: NgZone
    ) {}

    ngOnInit(){
        this.currentItem = this.sidebarItemService.getItemByName('gioithieu');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.gioithieu = new GioiThieu();
        this.files = [];
        this.filesToUpload = [];
        
        this.numberOfDataUpload = 0;
        this.gioithieuService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });

        this.gioithieuService.getGioiThieu().subscribe(gioithieu => {
            if (gioithieu && gioithieu.id !== undefined) {
                this.gioithieu = gioithieu;
                this.files = gioithieu.files;
            } else {
                let gioithieu = new GioiThieu();
                gioithieu.content = "Gioi Thieu";
                this.gioithieuService.saveGioiThieu(gioithieu).subscribe(gioithieu => this.gioithieu = gioithieu);
            }
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = [];
        this.filesToUpload = <Array<File>> fileInput.target.files;
		
        this.gioithieuService.uploadLoadFile(this.filesToUpload).subscribe(files => {
            this.files = files;
        });
    }

    deleteFile(file: FileSystem) {
        this.gioithieuService.deleteFile(this.gioithieu.id, file.id).subscribe(files => {
            this.files = files;
        });
    }

    saveGioiThieu() {
        this.gioithieuService.saveGioiThieu(this.gioithieu).subscribe(gioithieu => {
            this.gioithieu = gioithieu;
            this.files = gioithieu.files;
        });
    }

    cancelGioiThieu() {
        this.gioithieuService.getGioiThieu().subscribe(gioithieu => {
            this.gioithieu = gioithieu;
            this.files = gioithieu.files;
        });
    }

    public options: Object = { 
		placeholderText: 'Edit Your Content Here!',
		charCounterCount: false
	}
}
