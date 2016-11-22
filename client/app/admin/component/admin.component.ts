import { Component, OnInit } from '@angular/core';

import {SideBarItem} from '../model/sidebar-item';
import {SideBarItemService} from '../service/sidebar-item.service';
import {SidebarItemBroadcast} from '../service/sidebar-item-broadcast.service';

@Component({
  moduleId: module.id,
  selector: 'admin-app',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit { 
  private items: SideBarItem[];
  private itemSelected: SideBarItem;
  private isSideBarCollapsed: boolean;

  constructor(
    private sidebarItemService: SideBarItemService,
    private sidebarItemBroadcast: SidebarItemBroadcast
    ) {
      this.itemSelected = new SideBarItem();
    }

  ngOnInit() {
    this.isSideBarCollapsed = true;
    this.items = this.sidebarItemService.getSidebarItems();
    this.sidebarItemBroadcast.itemSubject.subscribe(item => this.itemSelected = item);
  }

  toggle() {
    this.isSideBarCollapsed = !this.isSideBarCollapsed;
  }
}