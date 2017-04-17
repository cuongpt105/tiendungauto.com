import {Component, OnInit, NgZone} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { FileSystem} from '../../model/file-system';
import { DichVu } from '../../model/dichvu';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';

import { DichVuService } from '../../service/dichvu.service';

@Component({
    selector: 'dich-vu',
    templateUrl: "./dichvu.component.html",
    styleUrls: ['./dichvu.component.css','../progress-bar.css']
})

export class DichVuComponent implements OnInit {
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;
    private dichvu : DichVu;
    private fileSystems : FileSystem[];
    private numberOfDataUpload: number;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sidebarItemService: SideBarItemService,
        private dichvuService: DichVuService,
        private _ngZone: NgZone
    ) {}

    ngOnInit(){
        this.currentItem = this.sidebarItemService.getItemByName('dichvu');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.dichvu = new DichVu();
        this.fileSystems = [];
        this.filesToUpload = [];
        
        this.numberOfDataUpload = 0;
        this.dichvuService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });

        this.dichvuService.getDichVu().subscribe(dichvu => {
            if (dichvu && dichvu.id !== undefined) {
                this.dichvu = dichvu;
                this.fileSystems = dichvu.files;
            } else {
                let dichvu = new DichVu();
                dichvu.content = "Dich Vu";
                this.dichvuService.saveDichVu(dichvu).subscribe(dichvu => this.dichvu = dichvu);
            }
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = [];
        this.filesToUpload = <Array<File>> fileInput.target.files;
		
        this.dichvuService.uploadLoadFile(this.filesToUpload).subscribe(fileSystems => {
            this.fileSystems = fileSystems;
        });
    }

    deleteFile(file: FileSystem) {
        this.dichvuService.deleteFile(this.dichvu.id, file.id).subscribe(fileSystems => {
            this.fileSystems = fileSystems;
        });
    }

    saveDichVu() {
        this.dichvuService.saveDichVu(this.dichvu).subscribe(dichvu => {
            this.dichvu = dichvu;
            this.fileSystems = dichvu.files;
        });
    }

    cancelDichVu() {
        this.dichvuService.getDichVu().subscribe(dichvu => {
            this.dichvu = dichvu;
            this.fileSystems = dichvu.files;
        });
    }

    public options: Object = { 
		placeholderText: 'Edit Your Content Here!',
		charCounterCount: false
	}
}
