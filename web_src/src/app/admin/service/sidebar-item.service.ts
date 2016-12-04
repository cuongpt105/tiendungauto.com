import { Injectable } from '@angular/core';

import { SideBarItem } from '../model/sidebar-item';

const SIDEBAR_ITEMS: SideBarItem[] = [
    {name: 'gioithieu', value: 'Gioi Thieu', linkRef: '/admin/gioithieu', iconClass: 'fa-info'},
    {name: 'header', value: 'Header', linkRef: '/admin/header', iconClass: 'fa-header'},
    {name: 'dichvu', value: 'Dich Vu', linkRef: '/admin/dichvu', iconClass: 'fa-tachometer'},
    {name: 'khuyenmai', value: 'Khuyen Mai', linkRef: '/admin/khuyenmai', iconClass: 'fa-tachometer'},
    {name: 'tintuc', value: 'Tin Tuc', linkRef: '/admin/tintuc', iconClass: 'fa-tachometer'},
    {name: 'bando', value: 'Ban Do', linkRef: '/admin/bando', iconClass: 'fa-tachometer'},
    {name: 'thanhtoan', value: 'Thanh Toan', linkRef: '/admin/thanhtoan', iconClass: 'fa-tachometer'},
    {name: 'lienhe', value: 'Lien He', linkRef: '/admin/lienhe', iconClass: 'fa-tachometer'},
    {name: 'danhmuc', value: 'Danh Muc', linkRef: '/admin/danhmuc', iconClass: 'fa-tachometer'},
    {name: 'sanpham', value: 'San Pham', linkRef: '/admin/sanpham', iconClass: 'fa-tachometer'},
    {name: 'gallery', value: 'Gallery', linkRef: '/admin/gallery', iconClass: 'fa-tachometer'},
];

@Injectable()
export class SideBarItemService {
    constructor() {}

    getSidebarItems(): SideBarItem[] {
        return SIDEBAR_ITEMS;
    }

    getItemByName(name: string): SideBarItem {
        let result = this.getSidebarItems().filter(item => {
            return (item.name === name);
        });
        return result? result[0] : null;
    }
}