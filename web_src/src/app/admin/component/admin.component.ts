import { Component, OnInit } from '@angular/core';

import './../../../css/froala-editor/css/froala_editor.min.css';
import './../../../css/froala-editor/css/froala_style.min.css';
import './../../../css/froala-editor/css/plugins/char_counter.css';
import './../../../css/froala-editor/css/plugins/code_view.css';
import './../../../css/froala-editor/css/plugins/colors.css';
import './../../../css/froala-editor/css/plugins/emoticons.css';
import './../../../css/froala-editor/css/plugins/file.css';
import './../../../css/froala-editor/css/plugins/fullscreen.css';
import './../../../css/froala-editor/css/plugins/image_manager.css';
import './../../../css/froala-editor/css/plugins/image.css';
import './../../../css/froala-editor/css/plugins/line_breaker.css';
import './../../../css/froala-editor/css/plugins/table.css';
import './../../../css/froala-editor/css/plugins/video.css';

import {SideBarItem} from '../model/sidebar-item';
import {SideBarItemService} from '../service/sidebar-item.service';
import {SidebarItemBroadcast} from '../service/sidebar-item-broadcast.service';

@Component({
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