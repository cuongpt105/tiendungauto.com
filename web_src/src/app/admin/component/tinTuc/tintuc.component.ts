import {Component, OnInit, NgZone} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { FileSystem} from '../../model/file-system';
import { TinTucFile} from '../../model/tintucfile';
import { TinTuc } from '../../model/tintuc';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';
import { TinTucFileService} from '../../service/tintucfile.service';
import { TinTucService } from '../../service/tintuc.service';

@Component({
    selector: 'tin-tuc',
    templateUrl: "./tintuc.component.html",
    styleUrls: ['./tintuc.component.css']
})

export class TinTucComponent implements OnInit {
    private currentItem: SideBarItem;
    private filesToUpload: Array<File>;

    private tintuc : TinTuc;
    private tintucfiles : TinTucFile[];
    private tintucs : TinTuc[];
    private numberOfDataUpload: number;

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sideBarItemService: SideBarItemService,
        private tintucfileService: TinTucFileService,
        private tintucService: TinTucService,
        private _ngZone: NgZone
    ){}

    ngOnInit() {
        this.currentItem = this.sideBarItemService.getItemByName("tintuc");
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.filesToUpload = [];
        this.tintucfiles = [];
        this.tintucs = [];

        this.tintuc = null;
        
        this.numberOfDataUpload = 0;
        this.tintucfileService.percentUploaded.subscribe(percent => {
            this._ngZone.run(() => this.numberOfDataUpload = percent);
        });

        this.tintucfileService.getTinTucFiles().subscribe(tintucfiles => this.tintucfiles = tintucfiles);
        this.tintucService.getTinTucs().subscribe(tintucs => {
            if (tintucs) {
                this.tintucs = tintucs;
            }
            
        });
    }

    fileChangeEvent(fileInput: any) {
        this.filesToUpload = [];
        this.filesToUpload = <Array<File>> fileInput.target.files;
        
        this.tintucfileService.uploadLoadFile(this.filesToUpload)
            .subscribe(tintucfiles => this.tintucfiles = tintucfiles);
    }

    deleteTinTucFile(tintucfile : TinTucFile) {
        this.tintucfileService.deleteFile(tintucfile.id)
            .subscribe(tintucfiles => this.tintucfiles = tintucfiles);
    }

    cancelTinTuc() {
        this.tintuc = null;
    }

    saveTinTuc() {
        this.tintucService.saveTinTuc(this.tintuc).subscribe(tintuc => {
            tintuc;
            this.tintuc = null;
            this.tintucService.getTinTucs().subscribe(tintucs => {
                this.tintucs = tintucs;
            });
        });
    }

    addTinTuc() {
        this.tintuc = new TinTuc();
    }

    editTinTuc(tintuc: TinTuc) {
        this.tintuc = JSON.parse(JSON.stringify(tintuc));

        let imageTitle: FileSystem = this.tintucfiles.filter(tt => this.tintuc.imageTitle.id === tt.file.id)[0].file;
        this.tintuc.imageTitle = imageTitle;
    }

    deleteTinTuc(tintuc: TinTuc) {
        this.tintucService.deleteTinTuc(tintuc.id).subscribe(tintucs => {
            this.tintucs = tintucs;
        });
    }
}
