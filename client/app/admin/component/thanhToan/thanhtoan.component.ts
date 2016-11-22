import {Component, OnInit, NgZone} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { FileSystem} from '../../model/file-system';
import { ThanhToan } from '../../model/thanhtoan';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';

import { ThanhToanService } from '../../service/thanhtoan.service';

@Component({
    moduleId: module.id,
    selector: 'thanh-toan',
    templateUrl: "./thanhtoan.component.html",
    styleUrls: ['./thanhtoan.component.css','../progress-bar.css']
})

export class ThanhToanComponent implements OnInit {
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;
    private thanhtoan : ThanhToan;
    private fileSystems : FileSystem[];
    private numberOfDataUpload: number;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sidebarItemService: SideBarItemService,
        private thanhtoanService: ThanhToanService,
        private _ngZone: NgZone
    ) {}

    ngOnInit(){
        this.currentItem = this.sidebarItemService.getItemByName('thanhtoan');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.thanhtoan = new ThanhToan();
        this.fileSystems = [];
        this.filesToUpload = [];
        
        this.numberOfDataUpload = 0;
        this.thanhtoanService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });

        this.thanhtoanService.getThanhToan().subscribe(thanhtoan => {
            if (thanhtoan && thanhtoan.id) {
                this.thanhtoan = thanhtoan;
                this.fileSystems = thanhtoan.files;
            } else {
                let thanhtoan = new ThanhToan();
                thanhtoan.content = "Thanh Toan";
                this.thanhtoanService.saveThanhToan(thanhtoan).subscribe(result => {
                    this.thanhtoan = result;
                });
            }
        });
    }

    fileChangeEvent(fileInput: any){
        this.filesToUpload = [];
        this.filesToUpload = <Array<File>> fileInput.target.files;
		
        this.thanhtoanService.uploadLoadFile(this.filesToUpload).subscribe(fileSystems => {
            this.fileSystems = fileSystems;
        });
    }

    deleteFile(file: FileSystem) {
        this.thanhtoanService.deleteFile(this.thanhtoan.id, file.id).subscribe(fileSystems => {
            this.fileSystems = fileSystems;
        });
    }

    saveThanhToan() {
        this.thanhtoanService.saveThanhToan(this.thanhtoan).subscribe(thanhtoan => {
            this.thanhtoan = thanhtoan;
            this.fileSystems = thanhtoan.files;
        });
    }

    cancelThanhToan() {
        this.thanhtoanService.getThanhToan().subscribe(thanhtoan => {
            this.thanhtoan = thanhtoan;
            this.fileSystems = thanhtoan.files;
        });
    }
}
