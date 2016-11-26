import { Component, AfterViewInit } from '@angular/core';

import { HeaderInfo } from '../../models/header-info';

import { HeaderInfoBroadcast } from '../../services/header-info-broadcast.service';

declare var $: any

@Component({
    selector: 'client-app',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.css']
})

export class ClientAppComponent implements AfterViewInit {

    constructor(
        private headerInfoBroadcast: HeaderInfoBroadcast) {}

    ngAfterViewInit() {
        this.headerInfoBroadcast.triggerBroadcast().subscribe(headerInfo => {
            $('html head').find('title').text(headerInfo.title);
            $("meta[name='keywords']").attr("content", headerInfo.keyword);
            $("meta[name='description']").attr("content", headerInfo.description);
        });
    }
}