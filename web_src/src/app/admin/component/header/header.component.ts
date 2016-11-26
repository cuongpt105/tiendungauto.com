import {Component, OnInit, NgZone} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';

import {SidebarItemBroadcast} from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';
import {HeaderService} from '../../service/header.service';
import {Header} from '../../model/header';

@Component({
    selector: 'header',
    templateUrl: "./header.component.html",
    styleUrls: ['./header.component.css','../progress-bar.css']
})

export class HeaderComponent implements OnInit {
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;
    private header: Header;
    private numberOfDataUpload: number;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sidebarItemService: SideBarItemService,
        private headerService: HeaderService,
        private _ngZone: NgZone){};

    ngOnInit() {
        this.currentItem = this.sidebarItemService.getItemByName('header');
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);
        this.filesToUpload = [];
        
        this.numberOfDataUpload = 0;
        this.headerService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });

        this.headerService.getHeader().subscribe(header => this.header = header);
    }

    upload() {
        this.headerService.uploadHeader(this.filesToUpload).subscribe(header => {
            this.header = header;
        });
    }
 
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>> fileInput.target.files;
    }
}
