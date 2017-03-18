import { Injectable } from '@angular/core';
import { Subject} from 'rxjs/Rx';

import {SideBarItem} from '../model/sidebar-item';

@Injectable()
export class SidebarItemBroadcast {
    public itemSubject = new Subject<SideBarItem>();

    constructor() {}

    broadCastItem(item: SideBarItem) {
       this.itemSubject.next(item);
    }
}