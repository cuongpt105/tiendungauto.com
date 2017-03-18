import {Component, OnInit} from '@angular/core';

import { SideBarItem } from '../../model/sidebar-item';
import { BanDo } from '../../model/bando';

import { SidebarItemBroadcast } from '../../service/sidebar-item-broadcast.service';
import { SideBarItemService } from '../../service/sidebar-item.service';
import { BanDoService } from '../../service/bando.service';

@Component({
    selector: 'ban-do',
    templateUrl: './bando.component.html',
    styleUrls: ['./bando.component.css']
})

export class BanDoComponent implements OnInit {
    private currentItem: SideBarItem;
    private bando: BanDo;
    private bandos: BanDo[];

    constructor(
        private sidebarItemBroadcast: SidebarItemBroadcast,
        private sideBarItemService: SideBarItemService,
        private bandoService: BanDoService
    ){}

    ngOnInit() {
        this.bando = null;
        this.bandos = [];

        this.currentItem = this.sideBarItemService.getItemByName("bando");
        this.sidebarItemBroadcast.broadCastItem(this.currentItem);

        this.bandoService.getBanDos().subscribe(bandos => {
            this.bandos = bandos;
        });
    }

    addBanDo() {
        this.bando = new BanDo();
    }

    editBanDo(bando: BanDo) {
        this.bando = JSON.parse(JSON.stringify(bando));
    }

    deleteBanDo(bando: BanDo) {
        this.bandoService.deleteBanDo(bando.id).subscribe(bandos => {
            this.bandos = bandos;
        });
    }

    saveBanDo() {
        this.bandoService.saveBanDo(this.bando).subscribe(bando => {
            bando;
            this.bandoService.getBanDos().subscribe(bandos => {
                this.bandos = bandos;
                this.bando = null;
            });
        });
    }

    cancelBanDo() {
        this.bando = null;
    }
}
